import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSlice } from "../redux/utils";
import { Movie } from "./models/Movie";

type MovieState = Movie[];

const initialState: MovieState = [];

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => [
      ...state,
      action.payload,
    ],
    removeMovie: (state, action: PayloadAction<string>) =>
      state.filter((movie) => movie.id !== action.payload),
  },
});

export const { addMovie, removeMovie } = movieSlice.actions;

const selectMovieSlice = getSlice(movieSlice);

export const selectMovieIds = createSelector(selectMovieSlice, (slice) =>
  slice.map((m) => m.id)
);

export const selectMovies = createSelector(selectMovieSlice, (slice) => slice);

export const makeSelectMovieById = () =>
  createSelector([selectMovieSlice, (_, id: string) => id], (slice, id) =>
    slice.find((m) => m.id === id)
  );
