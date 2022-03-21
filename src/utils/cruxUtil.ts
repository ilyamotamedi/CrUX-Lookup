import { ensureConfig } from './configUtil.js';

import fetch from 'node-fetch';
import { createQueryRecord, SuccessResponse } from 'crux-api';

import { validateUrl, validateWebsite } from './siteUtil.js';

const newQueryRecord = () => {
  ensureConfig();
  return createQueryRecord({ key: process.env.CRUX_API_KEY || '', fetch });
};

const singleLookup = async (url: string, origin?: boolean): Promise<SuccessResponse | null> => {
  const queryRecord = newQueryRecord();
  if (!validateUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  } else if (!(await validateWebsite(url))) {
    throw new Error(`Site doesn't exist: ${url}`);
  } else {
    const paramsObj = origin ? { origin: url } : { url };
    return queryRecord(paramsObj);
  }
};

interface SimplifiedCruxHistogram {
  redStop: number;
  yellowStop: number;
  greenStop: number;
  p75: number | string;
}

const transformCrUXData = (data: SuccessResponse | null): { [k: string]: SimplifiedCruxHistogram } => {
  if (!data) throw new Error('No data returned from CrUX');
  const metrics: { [k: string]: any } = data['record']['metrics'];
  const fcpHistogram = metrics['first_contentful_paint']['histogram'];
  const lcpHistogram = metrics['largest_contentful_paint']['histogram'];
  const clsHistogram = metrics['cumulative_layout_shift']['histogram'];
  const fidHistogram = metrics['first_input_delay']['histogram'];

  return {
    fcp: {
      greenStop: fcpHistogram[0]['density'],
      yellowStop: fcpHistogram[1]['density'],
      redStop: fcpHistogram[2]['density'],
      p75: metrics['first_contentful_paint']['percentiles']['p75'],
    },
    lcp: {
      greenStop: lcpHistogram[0]['density'],
      yellowStop: lcpHistogram[1]['density'],
      redStop: lcpHistogram[2]['density'],
      p75: metrics['largest_contentful_paint']['percentiles']['p75'],
    },
    cls: {
      greenStop: clsHistogram[0]['density'],
      yellowStop: clsHistogram[1]['density'],
      redStop: clsHistogram[2]['density'],
      p75: metrics['cumulative_layout_shift']['percentiles']['p75'],
    },
    fid: {
      greenStop: fidHistogram[0]['density'],
      yellowStop: fidHistogram[1]['density'],
      redStop: fidHistogram[2]['density'],
      p75: metrics['first_input_delay']['percentiles']['p75'],
    },
  };
};

export { singleLookup, transformCrUXData, SimplifiedCruxHistogram };
