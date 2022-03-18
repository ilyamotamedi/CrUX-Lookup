import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';
import { createQueryRecord, SuccessResponse, ErrorResponse } from 'crux-api';

const queryRecord = createQueryRecord({ key: process.env.CRUX_API_KEY || '', fetch: fetch });

interface simplifiedCruxHistogram {
  redStop: number;
  yellowStop: number;
  greenStop: number;
  p75: number | string;
}

const transformCrUXData = (data: SuccessResponse | null): { [k: string]: simplifiedCruxHistogram } => {
  if (!data) throw new Error('No data returned from CrUX');
  const metrics: { [k: string]: any } = data['record']['metrics'];
  const fcpHistogram = metrics['first_contentful_paint']['histogram'],
    lcpHistogram = metrics['largest_contentful_paint']['histogram'],
    clsHistogram = metrics['cumulative_layout_shift']['histogram'],
    fidHistogram = metrics['first_input_delay']['histogram'];

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

export { queryRecord, transformCrUXData, simplifiedCruxHistogram };
