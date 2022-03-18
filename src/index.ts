#!/usr/bin/env node

import { singleCommand } from './commands/singleCommand.js';

import { Command } from 'commander';
const program = new Command();

program.name('crux-lookup').description('Simple utility for looking up CRUX data').version('0.0.1');

program
  .command('single')
  .description('Lookup a CrUX record for a single URL')
  .argument('<url>', 'URL for which to get CrUX record')
  .option('-r, --origin', 'Lookup the origin of the URL')
  .option('-j, --json', 'Output raw JSON from CrUX')
  .option('-o, --output <file>', 'Valid filepath for saving lookup results (forces JSON output)', false)
  .action((url, options) => singleCommand(url, options));

// program
//   .command('multiple')
//   .description('Lookup a CRUX record for multiple URLs')
//   .argument(
//     '<urls>',
//     'URLs for which to get CrUX record, either as a vaild path to a CSV file containing a list of URLs, or as a comma-separated list of URLs',
//   )
//   .action((urls, options) => {});

program.parse();
