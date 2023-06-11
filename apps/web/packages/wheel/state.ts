import { makeVar, useReactiveVar } from '@apollo/client';

import { Range } from '@core/utils/range';

export const initialSpeedRange: Range = [100, 1000];
export const durationRange: Range = [3, 30];

const wheelPropertiesVar = makeVar({
  initialSpeed: 1000,
  duration: 10,
});

const isSpinningVar = makeVar(false);

export const setInitialSpeed = (initialSpeed: number) =>
  wheelPropertiesVar({ ...wheelPropertiesVar(), initialSpeed });

export const setDuration = (duration: number) =>
  wheelPropertiesVar({ ...wheelPropertiesVar(), duration });

export const spin = () => isSpinningVar(true);
export const stopSpin = () => isSpinningVar(false);

export const useIsWheelSpinning = () => useReactiveVar(isSpinningVar);
export const useWheelProperties = () => useReactiveVar(wheelPropertiesVar);
