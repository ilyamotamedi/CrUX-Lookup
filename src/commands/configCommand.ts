import fs from 'fs';
import ora from 'ora';

import { localEnv, ensureEnv, maskedKey, noKeySuffix } from '../utils/configUtil.js';

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
        }
      });
      process.env.CRUX_API_KEY = options.updateKey;
      spinner.succeed('Updated API key in configuration');
      return;
    } else {
      const resultString = !!process.env.CRUX_API_KEY
        ? `Currently stored CrUX API key is ${maskedKey(process.env.CRUX_API_KEY)}`
        : `Add a CrUX API key to your configuration by running \`crux-lookup config --updateKey <key>\`\n${noKeySuffix}`;

      spinner.succeed(resultString);
    }
  } catch (err) {
    spinner.fail(`Error updating configuration\n${err}`);
    return;
  }
};
