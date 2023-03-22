import { useCallback } from 'react';

import { useAppDispatch } from '@core/redux/hooks';

import { setMovieWinnerByIndex } from '@packages/movies';

export const useOnWheelSpinComplete = (itemAngle: number) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (rotation: number) => {
      const selectedIndex = getItemIndexFromRotation(itemAngle, rotation);
      dispatch(setMovieWinnerByIndex(selectedIndex));
    },
    [dispatch, itemAngle]
  );
};

const getItemIndexFromRotation = (itemAngle: number, rotation: number) => {
  const normalizedRotation = rotation % 360;
  return Math.floor(normalizedRotation / itemAngle);
};
