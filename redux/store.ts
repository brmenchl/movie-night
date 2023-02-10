import { wheelSlice } from "../WheelPane/wheelSlice";
import { configureStore } from "@reduxjs/toolkit";
import { movieSlice } from "../movies/movieSlice";

export const store = configureStore({
  reducer: {
    [movieSlice.name]: movieSlice.reducer,
    [wheelSlice.name]: wheelSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
