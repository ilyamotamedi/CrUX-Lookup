import { SimplifiedCruxHistogram } from './cruxUtil';

const colorFromPerecentage = (currentPercentage: number, histogram: SimplifiedCruxHistogram): string => {
  if (currentPercentage < histogram['greenStop'] * 100) {
    return '\x1b[32m'; // green
  } else if (currentPercentage < histogram['greenStop'] * 100 + histogram['yellowStop'] * 100) {
    return '\x1b[33m'; // yellow
  } else {
    return '\x1b[31m'; // red
  }
};

const printHistogramPercent = (histogram: SimplifiedCruxHistogram): string => {
  const formattedGreenStop = `${(histogram['greenStop'] * 100).toFixed(2)}%`;
  const formattedYellowStop = `${(histogram['yellowStop'] * 100).toFixed(2)}%`;
  const formattedRedStop = `${(histogram['redStop'] * 100).toFixed(2)}%`;

  return `\x1b[32m${formattedGreenStop}\x1b[0m • \x1b[33m${formattedYellowStop}\x1b[0m • \x1b[31m${formattedRedStop}`;
};

const paintHistogram = (label: string, histogram: SimplifiedCruxHistogram): void => {
  process.stdout.write(`\x1b[0m\n${label}: ${printHistogramPercent(histogram)}\n`); // reset color

  const blockString = '\u2588\u2588';
  const p75String = `<\x1b[0m p75: ${histogram['p75']}${label === 'CLS' ? '' : 'ms'}`;

  for (let i = 1; i < 101; i++) {
    const currentColor = colorFromPerecentage(i, histogram);
    if (i % 25 === 0) {
      process.stdout.write(`${currentColor}${blockString}${i === 75 ? p75String : ''}\n`); // add p75 marker 3/4 of the way down the bar
    } else {
      process.stdout.write(`${currentColor}${blockString}`);
    }
  }
};

const paintHistograms = (cruxData: { [k: string]: SimplifiedCruxHistogram }): void => {
  paintHistogram('FCP', cruxData['fcp']);
  paintHistogram('LCP', cruxData['lcp']);
  paintHistogram('CLS', cruxData['cls']);
  paintHistogram('FID', cruxData['fid']);
  process.stdout.write('\x1b[0m\n'); // reset color
};

export default paintHistograms;
