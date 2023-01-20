import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { movieSlice } from "../movies/movieSlice";

export const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
