import minimist = require('minimist');
import { ParsedArgs } from 'minimist';

const argv: ParsedArgs = minimist(process.argv.slice(2), {
  alias: {
    help: ['h'],
    input: ['i'],
    output: ['o'],
  },
});

console.log(argv);
