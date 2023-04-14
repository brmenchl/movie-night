import { N } from '@mobily/ts-belt';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { getSlice } from '../../turbo/apps/web/core/redux/utils';
import { Range } from '../../turbo/apps/web/core/utils/range';

type WheelState = {
  isSpinning: boolean;
  initialSpeed: number;
  duration: number;
};

export const initialSpeedRange: Range = [100, 1000];
export const durationRange: Range = [3, 30];

const initialState: WheelState = {
  isSpinning: false,
  initialSpeed: 1000,
  duration: 30,
};

export const wheelSlice = createSlice({
  name: 'wheel',
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
