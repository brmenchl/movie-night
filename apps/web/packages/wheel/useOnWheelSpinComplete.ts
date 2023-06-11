import { useCallback } from 'react';

import { usePickWinnerByIndex } from '@packages/movies';

export const useOnWheelSpinComplete = (itemAngle: number) => {
  const pickWinnerByIndex = usePickWinnerByIndex();

  return useCallback(
    (rotation: number) => {
      const selectedIndex = getItemIndexFromRotation(itemAngle, rotation);
      pickWinnerByIndex(selectedIndex);
    },
    [itemAngle, pickWinnerByIndex]
  );
};

const getItemIndexFromRotation = (itemAngle: number, rotation: number) => {
  const normalizedRotation = rotation % 360;
  return Math.floor(normalizedRotation / itemAngle);
};
