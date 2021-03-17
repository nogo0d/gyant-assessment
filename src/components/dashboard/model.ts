import { option } from 'fp-ts';

export const DEFAULT_LABEL = option.none;

export type DashboardStatus = 'LOADING' | 'WORK_DONE' | 'WORKING' | 'ERROR';
