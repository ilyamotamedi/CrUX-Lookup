import fs from 'fs';
import ora from 'ora';

import { localEnv, ensureEnv } from '../utils/configUtil.js';

export const configCommand = (options: any): void => {
  const spinner = ora('Updating configuration').start();

  ensureEnv();

  try {
    if (options.updateKey && options.removeKey) {
      spinner.fail('Cannot update and remove API key at the same time');
      return;
    } else if (options.removeKey) {
      fs.writeFile(localEnv, 'CRUX_API_KEY=\n', (err) => {
        if (err) {
          spinner.fail(`Failed to remove API key: ${err}`);
          return;
        }
      });
      delete process.env.CRUX_API_KEY;
      spinner.succeed('Removed API key from configuration');
      return;
    } else if (options.updateKey) {
      fs.writeFile(localEnv, `CRUX_API_KEY=${options.updateKey}\n`, (err) => {
        if (err) {
          spinner.fail(`Failed to update API key: ${err}`);
          return;
        }
      });
      process.env.CRUX_API_KEY = options.updateKey;
      spinner.succeed('Updated API key in configuration');
      return;
    } else {
      spinner.succeed(`Currently stored CrUX API key is ${process.env.CRUX_API_KEY}`);
    }
  } catch (err) {
    spinner.fail(`Error updating configuration\n${err}`);
    return;
  }
};
