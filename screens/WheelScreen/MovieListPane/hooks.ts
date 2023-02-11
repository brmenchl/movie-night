import { addMovie, removeMovie } from '@movies/movieSlice';
import { useAppDispatch } from '@redux/hooks';
import { nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';

export const useRemoveMovie = (id: string) => {
  const dispatch = useAppDispatch();
  return useCallback(() => dispatch(removeMovie(id)), [id, dispatch]);
};

export const useAddMovie = () => {
  const dispatch = useAppDispatch();
  return useCallback(
    (title: string) => dispatch(addMovie({ id: nanoid(), title })),
    [dispatch]
  );
};
