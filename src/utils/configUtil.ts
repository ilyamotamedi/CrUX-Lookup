import fs from 'fs';
import os from 'os';

const localStorageDir = os.homedir() + '/.crux-lookup';
const localEnv = localStorageDir + '/config.env';

import ora from 'ora';
import dotenv from 'dotenv';

const ensureEnv = (): void => {
  if (!fs.existsSync(localStorageDir)) {
    fs.mkdirSync(localStorageDir);
  }

  if (!fs.existsSync(localEnv)) {
    fs.writeFileSync(localEnv, '\n\n');
  }

  dotenv.config({ path: localEnv });
};

const ensureConfig = (): void => {
  const spinner = ora('Checking configuration').start();

  ensureEnv();

  if (!process.env.CRUX_API_KEY) {
    spinner.fail('Please add an API key first by running `crux-lookup config --updateKey <key>`');
    process.exit(1);
  }
  spinner.succeed('Configuration looks good');
};

export { localEnv, ensureEnv, ensureConfig };
