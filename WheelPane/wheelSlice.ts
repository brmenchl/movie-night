import { N } from "@mobily/ts-belt";
import { getSlice } from "@redux/utils";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Range } from "../utils/range";

type WheelState = {
  isSpinning: boolean;
  initialSpeed: number;
  duration: number;
};

export const initialSpeedRange: Range = [100, 1000];
export const durationRange: Range = [3, 30];

const initialState: WheelState = {
  isSpinning: false,
  initialSpeed: 0,
  duration: 0,
};

export const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    setInitialSpeed: (state, action: PayloadAction<number>) => ({
      ...state,
      initialSpeed: N.clamp(...initialSpeedRange, action.payload),
    }),
    setDuration: (state, action: PayloadAction<number>) => ({
      ...state,
      duration: N.clamp(...durationRange, action.payload),
    }),
    spin: (state) => ({
      ...state,
      isSpinning: true,
    }),
    stopSpin: (state) => ({
      ...state,
      isSpinning: false,
    }),
  },
});

export const { spin, stopSpin, setInitialSpeed, setDuration } =
  wheelSlice.actions;

const selectWheelSlice = getSlice(wheelSlice);

export const selectIsWheelSpinning = createSelector(
  selectWheelSlice,
  (slice) => slice.isSpinning
);

export const selectWheelSpinProperties = createSelector(
  selectWheelSlice,
  (slice) => ({ initialSpeed: slice.initialSpeed, duration: slice.duration })
);
