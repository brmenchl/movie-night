import { useCallback } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@core/redux/hooks";
import { addMovie, removeMovie } from "@core/movies/movieSlice";

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
