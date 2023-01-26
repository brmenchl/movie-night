import { getSlice } from "@redux/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

type WheelState = { isSpinning: boolean };

const initialState: WheelState = { isSpinning: false };

export const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    spin: () => ({
      isSpinning: true,
    }),
    stopSpin: () => ({
      isSpinning: false,
    }),
  },
});

export const { spin, stopSpin } = wheelSlice.actions;

const selectWheelSlice = getSlice(wheelSlice);

export const selectIsWheelSpinning = createSelector(
  selectWheelSlice,
  (slice) => slice.isSpinning
);
