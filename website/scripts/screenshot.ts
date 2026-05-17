import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createInterface } from 'node:readline';
import chalk from 'chalk';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import type { Project } from '@/shared';

const DEFAULT_VIEWPORT = { width: 1280, height: 800 };
const SCREENSHOTS_DIR = fileURLToPath(new URL('../../data/screenshots', import.meta.url));
const LIST_JSON_PATH = fileURLToPath(new URL('../../data/LIST.json', import.meta.url));

interface ParsedArgs {
  projectId: number | null;
  width: number;
  height: number;
  showHelp: boolean;
}

function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    return {
      projectId: null,
      width: DEFAULT_VIEWPORT.width,
      height: DEFAULT_VIEWPORT.height,
      showHelp: true,
    };
  }

  let projectId: number | null = null;
  let width = DEFAULT_VIEWPORT.width;
  let height = DEFAULT_VIEWPORT.height;

  for (const arg of args) {
    if (arg.startsWith('--width=')) {
      width = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--height=')) {
      height = parseInt(arg.split('=')[1], 10);
    } else if (!arg.startsWith('-')) {
      const parsed = parseInt(arg, 10);
      if (!isNaN(parsed)) {
        projectId = parsed;
      }
    }
  }

  return { projectId, width, height, showHelp: false };
}

function displayHelp(): void {
  console.info(chalk.bold('\nUsage:'));
  console.info('  bun ./scripts/screenshot.ts <project-id> [options]');
  console.info('\nArguments:');
  console.info('  project-id   The ID of the project to screenshot');
  console.info('\nOptions:');
  console.info(`  --width=N    Viewport width (default: ${DEFAULT_VIEWPORT.width})`);
  console.info(`  --height=N   Viewport height (default: ${DEFAULT_VIEWPORT.height})`);
  console.info('  -h, --help   Show this help message');
  console.info('\nExamples:');
  console.info('  bun ./scripts/screenshot.ts 3');
  console.info('  bun ./scripts/screenshot.ts 15 --width=1920 --height=1080\n');
}

function findChrome(): string {
  const candidates: string[] = [];

  switch (process.platform) {
    case 'darwin':
      candidates.push(
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        '/Applications/Chromium.app/Contents/MacOS/Chromium'
      );
      break;
    case 'linux':
      candidates.push(
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium-browser',
        '/usr/bin/chromium',
        '/snap/bin/chromium'
      );
      break;
    case 'win32':
      candidates.push(
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      );
      break;
  }

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  console.error(chalk.red('Error: Chrome not found on this system.'));
  console.error(chalk.dim('Searched paths:'));
  for (const c of candidates) {
    console.error(chalk.dim(`  ${c}`));
  }
  process.exit(1);
}

function generateSlug(name: string): string {
  // "palmcivet/awesome-arknights-endfield" → "awesome-arknights-endfield"
  // "ENDFIELD MAP" → "endfield-map"
  const part = name.includes('/') ? name.split('/').pop()! : name;
  return part
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getNextScreenshotNumber(projectId: number, slug: string): number {
  if (!existsSync(SCREENSHOTS_DIR)) {
    return 1;
  }

  const prefix = `${projectId}-${slug}-`;
  const files = readdirSync(SCREENSHOTS_DIR);
  let maxNum = 0;

  for (const file of files) {
    if (file.startsWith(prefix) && file.endsWith('.png')) {
      const numStr = file.slice(prefix.length, -4); // remove prefix and .png
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && num > maxNum) {
        maxNum = num;
      }
    }
  }

  return maxNum + 1;
}

function createReadlineInterface() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function ask(
  rl: ReturnType<typeof createReadlineInterface>,
  question: string
): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function loadProjects(): Project[] {
  const content = readFileSync(LIST_JSON_PATH, 'utf-8');
  return JSON.parse(content) as Project[];
}

function saveProjects(projects: Project[]): void {
  writeFileSync(LIST_JSON_PATH, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
}

async function main() {
  const { projectId, width, height, showHelp } = parseArgs();

  if (showHelp) {
    displayHelp();
    process.exit(0);
  }

  if (projectId === null) {
    console.error(chalk.red('Error: Please provide a project ID.'));
    console.error(chalk.dim('Usage: bun ./scripts/screenshot.ts <project-id>'));
    console.error(chalk.dim('Run with --help for more information.'));
    process.exit(1);
  }

  // Load projects
  console.info(chalk.bold.blue('> Loading projects...'));
  const projects = loadProjects();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    console.error(chalk.red(`Error: Project with ID ${projectId} not found.`));
    process.exit(1);
  }

  console.info(chalk.green(`✓ Found project: ${project.name}`));

  // Check website URLs
  if (!project.website || project.website.length === 0) {
    console.error(chalk.red('Error: This project has no website URL for screenshot.'));
    process.exit(1);
  }

  // Select URL
  let url: string;
  if (project.website.length === 1) {
    url = project.website[0].url;
  } else {
    console.info(chalk.bold('\nAvailable websites:'));
    project.website.forEach((w, i) => {
      console.info(`  ${i + 1}) [${w.provider}] ${w.url}`);
    });

    const rl = createReadlineInterface();
    const choice = await ask(
      rl,
      chalk.yellow(`\nSelect website (1-${project.website.length}): `)
    );
    rl.close();

    const idx = parseInt(choice, 10) - 1;
    if (isNaN(idx) || idx < 0 || idx >= project.website.length) {
      console.error(chalk.red('Invalid selection.'));
      process.exit(1);
    }
    url = project.website[idx].url;
  }

  console.info(chalk.dim(`  URL: ${url}`));
  console.info(chalk.dim(`  Viewport: ${width}×${height}`));

  // Generate slug
  const slug = generateSlug(project.name);
  console.info(chalk.dim(`  Slug: ${slug}`));

  // Find Chrome
  console.info(chalk.bold.blue('\n> Detecting Chrome...'));
  const chromePath = findChrome();
  console.info(chalk.green(`✓ Found: ${chromePath}`));

  // Launch browser
  console.info(chalk.bold.blue('\n> Launching Chrome...'));
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: false,
    defaultViewport: { width, height, deviceScaleFactor: 2 },
    args: [`--window-size=${width},${height}`],
  });

  const page = await browser.newPage();

  console.info(chalk.bold.blue('> Navigating to URL...'));
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  console.info(chalk.green('✓ Page loaded'));

  // Interactive screenshot loop
  const rl = createReadlineInterface();
  const newScreenshots: string[] = [];
  let screenshotNum = getNextScreenshotNumber(projectId, slug);

  while (true) {
    await ask(
      rl,
      chalk.yellow('\n📸 Adjust the page in the browser, then press Enter to capture...')
    );

    const filename = `${projectId}-${slug}-${screenshotNum}.png`;
    const outputPath = resolve(SCREENSHOTS_DIR, filename);

    console.info(chalk.bold.blue(`> Capturing screenshot #${screenshotNum}...`));

    // Take screenshot
    const rawBuffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    });

    const rawSize = rawBuffer.byteLength;

    // Compress with sharp (lossless, max DEFLATE compression)
    const compressed = await sharp(rawBuffer).png({ compressionLevel: 9 }).toBuffer();

    writeFileSync(outputPath, compressed);

    const compressedSize = compressed.byteLength;
    const ratio = ((1 - compressedSize / rawSize) * 100).toFixed(1);

    console.info(chalk.green(`✓ Saved: ${filename}`));
    console.info(
      chalk.dim(
        `  Size: ${formatBytes(rawSize)} → ${formatBytes(compressedSize)} (${ratio}% reduced)`
      )
    );

    newScreenshots.push(filename);
    screenshotNum++;

    const cont = await ask(rl, chalk.yellow('Continue capturing? (y/n): '));
    if (cont.toLowerCase() !== 'y') {
      break;
    }
  }

  rl.close();

  // Close browser
  await browser.close();

  if (newScreenshots.length === 0) {
    console.info(chalk.yellow('\nNo screenshots were captured.'));
    process.exit(0);
  }

  // Update LIST.json
  console.info(chalk.bold.blue('\n> Updating LIST.json...'));
  const allProjects = loadProjects();
  const targetProject = allProjects.find((p) => p.id === projectId)!;

  const existing = targetProject.screenshots || [];
  targetProject.screenshots = [...existing, ...newScreenshots];

  saveProjects(allProjects);
  console.info(chalk.green('✓ LIST.json updated'));
  console.info(chalk.dim(`  Added: ${newScreenshots.join(', ')}`));

  // Done
  console.info(chalk.bold.green('\n✓ Screenshot complete'));
  console.info(
    chalk.dim('Next step: run `bun generate:list` to update documentation.\n')
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

main().catch((err) => {
  console.error(chalk.red(`\nUnexpected error: ${err.message}`));
  process.exit(1);
});
