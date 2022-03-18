import { validateUrl, validateWebsite } from '../utils/siteUtil.js';
import { queryRecord } from '../utils/cruxUtil.js';
import { ErrorResponse, SuccessResponse } from 'crux-api';

const singleLookup = async (url: string, origin?: boolean): Promise<SuccessResponse | null> => {
  if (!validateUrl(url)) {
    throw new Error(`Invalid URL: ${url}`);
  } else if (!(await validateWebsite(url))) {
    throw new Error(`Site doesn't exist: ${url}`);
  } else {
    let paramsObj = origin ? { origin: url } : { url: url };
    return queryRecord(paramsObj);
  }
};

export default singleLookup;
