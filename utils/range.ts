export type Range = readonly [min: number, max: number];
export const min = ([min]: Range) => min;
export const max = ([_, max]: Range) => max;
