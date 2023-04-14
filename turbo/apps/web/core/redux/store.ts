import { configureStore } from '@reduxjs/toolkit';

import { movieSlice } from '@packages/movies';

import { wheelSlice } from '../../../../../packages/wheel/wheelSlice';

export const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer,
    [wheelSlice.name]: wheelSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
