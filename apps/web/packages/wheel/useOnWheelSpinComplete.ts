import { useCallback } from 'react';

import { usePickWinnerByIndex } from '@/packages/movies';
import { useNightId } from '@/packages/nights';

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
  const lastIndex = 360 / itemAngle - 1;
  // Rotation is going backwards through the array indices
  const normalizedRotation = rotation % 360;
  const backwardsIndices = Math.floor(normalizedRotation / itemAngle);
  return lastIndex - backwardsIndices;
};
