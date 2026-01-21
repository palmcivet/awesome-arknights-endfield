import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';

const DEFAULT_PATH = fileURLToPath(new URL('../../data/LIST.json', import.meta.url));

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

    // Format JSON
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
