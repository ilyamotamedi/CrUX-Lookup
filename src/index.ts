#!/usr/bin/env node

import { singleCommand } from './commands/singleCommand.js';
import { configCommand } from './commands/configCommand.js';

import { Command } from 'commander';
const program = new Command();

program.name('crux-lookup').description('Simple utility for looking up CrUX data').version('0.8.0');

program
  .command('single', { isDefault: true })
  .description('Lookup a CrUX record for a single URL')
  .argument('<url>', 'URL for which to get CrUX record')
  .option('-r, --origin', 'Lookup the origin of the URL')
  .option('-j, --json', 'Output raw JSON from CrUX')
  .option('-o, --output <file>', 'Valid filepath for saving lookup results (forces JSON output)', false)
  .action((url, options) => {
    singleCommand(url, options);
  });

program
  .command('config')
  .description('Add, change, or remove configuration settings')
  .option('-u, --updateKey <key>', 'CrUX API key to use for queries')
  .option('-r, --removeKey', 'Remove CrUX API key from configuration')
  .action((options) => {
    configCommand(options);
  });

program.parse();
