import { A, D, F, O, Option } from '@mobily/ts-belt';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { getSlice } from '@core/redux/utils';

import { Movie } from './models/Movie';

type MovieState = {
  byId: Record<string, Movie>;
  winnerId: Option<string>;
  all: readonly string[];
};

const None = O.None as Option<string>;

const initialState: MovieState = { byId: {}, winnerId: O.None, all: [] };

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => ({
      ...state,
      byId: D.set(state.byId, action.payload.id, action.payload),
      all: A.append(state.all, action.payload.id),
      winnerId: None,
    }),
    removeMovie: (state, action: PayloadAction<string>) => ({
      ...state,
      byId: D.deleteKey(state.byId, action.payload),
      all: A.filter(state.all, (id) => id !== action.payload),
      winnerId: None,
    }),
    updateMovie: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => ({
      ...state,
      byId: D.update(
        state.byId,
        action.payload.id,
        O.map(F.always(action.payload))
      ),
    }),
    shuffleMovies: (state) => ({
      ...state,
      all: A.shuffle(state.all),
    }),
    setMovieWinnerByIndex: (state, action: PayloadAction<number>) => ({
      ...state,
      winnerId: state.all[action.payload],
    }),
    resetMovieWinner: (state) => ({
      ...state,
      winnerId: None,
    }),
  },
});

export const {
  addMovie,
  removeMovie,
  updateMovie,
  shuffleMovies,
  setMovieWinnerByIndex,
  resetMovieWinner,
} = movieSlice.actions;

const selectMovieSlice = getSlice(movieSlice);

const selectWinnerId = createSelector(
  selectMovieSlice,
  (slice) => slice.winnerId
);

export const selectMovieIds = createSelector(
  selectMovieSlice,
  (slice) => slice.all
);

export const selectMovies = createSelector(selectMovieSlice, (slice) =>
  A.map(slice.all, (id) => slice.byId[id])
);

export const makeSelectMovieById = () =>
  createSelector(
    [selectMovieSlice, (_, id: string) => id],
    (slice, id) => slice.byId[id]
  );

export const selectWinnerMovie = createSelector(
  selectMovieSlice,
  selectWinnerId,
  (slice, winnerId) => O.map(winnerId, (s) => slice.byId[s])
);