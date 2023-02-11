import { addMovie, removeMovie, shuffleMovies } from '@movies/movieSlice';
import { useAppDispatch } from '@redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback, useMemo } from 'react';

export const useRemoveMovie = (id: string) => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(removeMovie(id)), [id, dispatch]);
};

export const useMovieMutations = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      addMovie: (title: string) => dispatch(addMovie({ id: nanoid(), title })),
      removeMovie: (id: string) => dispatch(removeMovie(id)),
      shuffleMovies: () => dispatch(shuffleMovies()),
    }),
    [dispatch]
  );
};
