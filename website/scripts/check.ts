import { readFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import { prettifyError, type ZodError } from 'zod';
import { parseProjects } from '@/validator';

interface ParsedArgs {
  filePath: string;
  showHelp: boolean;
}

const DEFAULT_PATH = fileURLToPath(new URL('../../data/LIST.json', import.meta.url));

function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    return { filePath: '', showHelp: true };
  }

  const filePath = args[0] || DEFAULT_PATH;
  return { filePath, showHelp: false };
}

function displayHelp(): void {
  console.info(chalk.bold('\nUsage:'));
  console.info('  bun ./scripts/check.ts [file]');
  console.info('\nArguments:');
  console.info(
    '  file    Path to the JSON file to validate (default: ../data/LIST.json)'
  );
  console.info('\nOptions:');
  console.info('  -h, --help   Show this help message');
  console.info('\nExamples:');
  console.info('  bun ./scripts/check.ts');
  console.info('  bun ./scripts/check.ts data/LIST.json');
  console.info('  bun ./scripts/check.ts /path/to/custom.json\n');
}

function readFile(filePath: string): string {
  console.info(chalk.bold.blue('> Reading file...'));
  console.info(chalk.dim(`  File path: ${filePath}`));

  try {
    const fileContent = readFileSync(filePath, 'utf-8');
    console.info(chalk.green('✓ File read successfully\n'));
    return fileContent;
  } catch (error: any) {
    console.error(chalk.bold.red('✗ File read failed\n'));

    switch (error.code) {
      case 'ENOENT': {
        console.error(chalk.red('Error: File not found'));
        console.error(chalk.dim(`Path: ${filePath}\n`));
        break;
      }
      case 'EACCES': {
        console.error(chalk.red('Error: Permission denied'));
        console.error(chalk.dim(`Path: ${filePath}\n`));
        break;
      }
      default:
        console.error(chalk.red(`Error: ${error.message}`));
        console.error(chalk.dim(`Path: ${filePath}\n`));
        break;
    }

    process.exit(1);
  }
}

function parseJson(content: string): any {
  console.info(chalk.bold.blue('> Parsing JSON...'));
  console.info(chalk.dim(`  Data size: ${content.length} characters`));

  try {
    const jsonData = JSON.parse(content);
    console.info(chalk.green('✓ JSON parsed successfully\n'));

    if (!Array.isArray(jsonData)) {
      console.info(chalk.yellow('⚠ Warning: Root element is not an array\n'));
    }

    return jsonData;
  } catch (error) {
    console.error(chalk.bold.red('✗ JSON parse failed\n'));

    if (error instanceof SyntaxError) {
      console.error(chalk.red(`Syntax Error: ${error.message}`));

      // Try to extract line and column info from error message
      const match = error.message.match(/position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        const lines = content.substring(0, position).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        console.error(chalk.dim(`Location: Line ${line}, Column ${column}`));

        // Show context
        const contextStart = Math.max(0, position - 50);
        const contextEnd = Math.min(content.length, position + 50);
        const context = content.substring(contextStart, contextEnd);
        console.error(chalk.dim(`Context: ...${context}...\n`));
      } else {
        console.error('');
      }
    }

    process.exit(1);
  }
}

function validateWithZod(json: any): void {
  console.info(chalk.bold.blue('> Validating schema...'));
  console.info(chalk.dim(`  Total entries: ${json.length}`));

  try {
    parseProjects(json);
    console.info(chalk.bold.green('✓ Validation successful\n'));
  } catch (error) {
    console.error(chalk.bold.red('✗ Schema Validation Failed\n'));

    if (error instanceof Error && 'issues' in error) {
      const zodError = error as ZodError;
      console.error(prettifyError(zodError));
    } else {
      console.error(chalk.red(`Unexpected error: ${error}\n`));
    }

    process.exit(1);
  }
}

function main() {
  // Parse command line arguments
  const { filePath, showHelp } = parseArgs();

  // Show help if requested
  if (showHelp) {
    displayHelp();
    process.exit(0);
  }

  // Read file (exit if fails)
  const fileContent = readFile(filePath);

  // Parse JSON (exit if fails)
  const jsonContent = parseJson(fileContent);

  // Validate with Zod (exit if fails)
  validateWithZod(jsonContent);

  // All stages passed
  console.info(chalk.bold.green('✓ All validation stages passed'));

  process.exit(0);
}

main();
