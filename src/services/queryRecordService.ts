import { createQueryRecord } from 'crux-api';
import nodeFetch from 'node-fetch';

const queryRecord = createQueryRecord({ key: process.env.CRUX_API_KEY || '', fetch: nodeFetch });

export default queryRecord;
