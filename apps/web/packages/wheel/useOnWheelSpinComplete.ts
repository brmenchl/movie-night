import { useCallback } from 'react';

import { usePickWinnerByIndex } from '@packages/movies';
import { useNightId } from '@packages/nights';

export const useOnWheelSpinComplete = (itemAngle: number) => {
  const nightId = useNightId();
  const pickWinnerByIndex = usePickWinnerByIndex(nightId);

  return useCallback(
    (rotation: number) => {
      const selectedIndex = getItemIndexFromRotation(itemAngle, rotation);
      pickWinnerByIndex(selectedIndex);
    },
    [itemAngle, pickWinnerByIndex],
  );
};

const getItemIndexFromRotation = (itemAngle: number, rotation: number) => {
  const normalizedRotation = rotation % 360;
  return Math.floor(normalizedRotation / itemAngle);
};
