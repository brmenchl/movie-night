import { A } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../core/redux/hooks';

import { resetMovieWinner, selectMovies } from '@packages/movies';

import { spin } from '../../../../../../packages/wheel/wheelSlice';

export const useGetMovieWheelOptions = () =>
  A.map(
    useAppSelector(selectMovies, (as, ab) =>
      A.eq(as, ab, (a, b) => a.id === b.id)
    ),
    (movie) => ({
      id: movie.id,
      displayName: movie.title,
    })
  );

export const useSpinWheel = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(spin());
    dispatch(resetMovieWinner());
  }, [dispatch]);
};
