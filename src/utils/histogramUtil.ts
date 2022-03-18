import { simplifiedCruxHistogram } from './cruxUtil';

const colorFromPerecentage = (currentPercentage: number, histogram: simplifiedCruxHistogram): string => {
  if (currentPercentage < histogram['greenStop'] * 100) {
    return '\x1b[32m'; // green
  } else if (currentPercentage < histogram['greenStop'] * 100 + histogram['yellowStop'] * 100) {
    return '\x1b[33m'; // yellow
  } else {
    return '\x1b[31m'; // red
  }
};

const paintHistogram = (label: string, histogram: simplifiedCruxHistogram): void => {
  process.stdout.write(`\x1b[0m\n ${label} \n`); // reset color
  const p75String = `<\x1b[0m p75: ${histogram['p75']}${label === 'CLS' ? '' : 'ms'}`;

  for (let i = 1; i < 101; i++) {
    let currentColor = colorFromPerecentage(i, histogram);
    if (i % 25 === 0) {
      process.stdout.write(`${currentColor}\u2588${i === 75 ? p75String : ''}\n`); // add p75 marker 3/4 of the way down the bar
    } else {
      process.stdout.write(`${currentColor}\u2588`);
    }
  }
};

const paintHistograms = (cruxData: { [k: string]: simplifiedCruxHistogram }): void => {
  paintHistogram('FCP', cruxData['fcp']);
  paintHistogram('LCP', cruxData['lcp']);
  paintHistogram('CLS', cruxData['cls']);
  paintHistogram('FID', cruxData['fid']);
};

export default paintHistograms;
