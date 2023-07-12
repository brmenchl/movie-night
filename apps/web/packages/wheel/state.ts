import { makeVar, useReactiveVar } from '@apollo/client';

const wheelPropertiesVar = makeVar({
  initialSpeed: 1000,
  duration: 10,
});

const isSpinningVar = makeVar(false);

export const spin = () => isSpinningVar(true);
export const stopSpin = () => isSpinningVar(false);

export const useIsWheelSpinning = () => useReactiveVar(isSpinningVar);
export const useWheelProperties = () => useReactiveVar(wheelPropertiesVar);
