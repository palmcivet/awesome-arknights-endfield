/* eslint-disable @typescript-eslint/no-explicit-any */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

const DEFAULT_PATH = fileURLToPath(new URL('../../data/LIST.json', import.meta.url));

// Register all formatting rules here
const FORMAT_RULES: Array<{ name: string; rule: FormatRule }> = [
  { name: 'Sort website providers', rule: sortWebsiteProviders },
  { name: 'Sort screenshots', rule: sortScreenshots },
];

type FormatRule = (projects: Array<any>) => void;

/**
 * @description Sort website providers alphabetically.
 */
function sortWebsiteProviders(projects: Array<any>): void {
  for (const project of projects) {
    if (Array.isArray(project.website) && project.website.length > 1) {
      project.website.sort((a: any, b: any) => a.provider.localeCompare(b.provider));
    }
  }
}

/**
 * @description Sort screenshots alphabetically.
 */
function sortScreenshots(projects: Array<any>): void {
  for (const project of projects) {
    if (Array.isArray(project.screenshots) && project.screenshots.length > 1) {
      project.screenshots.sort((a: string, b: string) => a.localeCompare(b));
    }
  }
}

function applyRules(projects: Array<any>): void {
  for (const { name, rule } of FORMAT_RULES) {
    console.info(chalk.bold.blue(`> ${name}...`));
    rule(projects);
    console.info(chalk.green(`✓ ${name} done\n`));
  }
}

async function main() {
  try {
    // Read file
    console.info(chalk.bold.blue('> Reading file...'));
    console.info(chalk.dim(`  File path: ${DEFAULT_PATH}`));
    const fileContent = readFileSync(DEFAULT_PATH, 'utf-8');
    console.info(chalk.green('✓ File read successfully\n'));

    // Parse JSON
    console.info(chalk.bold.blue('> Parsing JSON...'));
    const jsonContent = JSON.parse(fileContent);
    console.info(chalk.dim(`  Data size: ${jsonContent.length} characters`));
    console.info(chalk.green('✓ JSON parsed successfully\n'));

    // Apply formatting rules
    applyRules(jsonContent);

    // Write formatted content
    const formatted = JSON.stringify(jsonContent, null, 2) + '\n';
    console.info(chalk.bold.blue('> Writing formatted content...'));
    console.info(chalk.dim(`  Output path: ${DEFAULT_PATH}`));
    writeFileSync(DEFAULT_PATH, formatted, 'utf-8');
    console.info(chalk.green('✓ File written successfully\n'));

    console.info(chalk.bold.green('✓ Formatting completed successfully'));

    process.exit(0);
  } catch (error: any) {
    console.error(chalk.bold.red('✗ Formatting failed\n'));
    console.error(chalk.red(`Error: ${error.message}\n`));
    process.exit(1);
  }
}

main();
