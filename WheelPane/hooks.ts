import { A } from "@mobily/ts-belt";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { resetMovieWinner, selectMovies } from "@movies/movieSlice";
import { spin } from "./wheelSlice";
import { useCallback } from "react";

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
