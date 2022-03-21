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
  const errorSuffix = `You can get a (free) CrUX API key at https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started`;

  ensureEnv();

  if (!process.env.CRUX_API_KEY) {
    spinner.fail(
      `Please add a valid CrUX API key first by running \`crux-lookup config --updateKey <key>\`\n${errorSuffix}`,
    );
    process.exit(1);
  }

  if (process.env.CRUX_API_KEY.length !== 36) {
    spinner.fail(
      `Stored API key is invalid. Update it by running \`crux-lookup config --updateKey <key>\`\n${errorSuffix}`,
    );
    process.exit(1);
  }
  spinner.succeed('Configuration looks good');
};

export { localEnv, ensureEnv, ensureConfig };
