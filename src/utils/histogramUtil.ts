import { simplifiedCruxHistogram } from './cruxUtil';

const colorFromPerecentage = (currentPercentage: number, histogram: simplifiedCruxHistogram) => {
  if (currentPercentage < histogram['greenStop'] * 100) {
    return '\x1b[32m'; // green
  } else if (currentPercentage < histogram['greenStop'] * 100 + histogram['yellowStop'] * 100) {
    return '\x1b[33m'; // yellow
  } else {
    return '\x1b[31m'; // red
  }
};

const paintHistogram = (label: string, histogram: simplifiedCruxHistogram) => {
  process.stdout.write(`\x1b[0m\n ${label} \n`); // reset color
  const p75String = `<\x1b[0m p75: ${histogram['p75']}`;

  for (let i = 1; i < 101; i++) {
    let currentColor = colorFromPerecentage(i, histogram);
    if (i % 5 === 0) {
      process.stdout.write(`${currentColor}\u2588${i === 75 ? p75String : ''}\n`);
    } else {
      process.stdout.write(`${currentColor}\u2588`);
    }
  }
};

const paintHistograms = (cruxData: { [k: string]: simplifiedCruxHistogram }) => {
  paintHistogram('FCP', cruxData['fcp']);
  paintHistogram('LCP', cruxData['lcp']);
  paintHistogram('CLS', cruxData['cls']);
  paintHistogram('FID', cruxData['fid']);
};

export default paintHistograms;
