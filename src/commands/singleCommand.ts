import { singleLookup } from '../utils/cruxUtil.js';
import { transformCrUXData } from '../utils/cruxUtil.js';
import paintHistograms from '../utils/histogramUtil.js';

import ora from 'ora';
import fs from 'fs';

export const singleCommand = (url: string, options: any) => {
  const spinner = ora(`Looking up ${url}`).start();
  singleLookup(url, options.origin)
    .then((data) => {
      if (options.output) {
        spinner.text = `Saving results for ${url} to ${options.output}`;
        fs.writeFile(options.output, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            spinner.fail(`Error saving results for ${url} to ${options.output}\n${err}`);
          } else {
            spinner.succeed(`Saved ${url} to ${options.output}`);
          }
        });
      } else if (options.json) {
        spinner.succeed(`Found this for ${options.origin ? 'origin' : ''} ${url}:\n${JSON.stringify(data, null, 2)}`);
      } else {
        const transformedCrUXData = transformCrUXData(data);

        spinner.succeed(`Found this for ${options.origin ? 'origin' : ''} ${url}:`);
        paintHistograms(transformedCrUXData);
      }
    })
    .catch((err) => {
      spinner.fail(`Error retrieving CrUX data for ${url}\n${err}`);
    });
};
