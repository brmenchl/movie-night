import { setMovieWinnerByIndex } from '@movies/movieSlice';
import { useAppDispatch } from '@redux/hooks';
import { useCallback } from 'react';

export const useOnWheelSpinComplete = (itemAngle: number) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (rotation: number) => {
      console.log(rotation);
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
