import { useCallback, useEffect, useRef } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  useRequestAnimationFrame,
} from '@core/redux/hooks';

import {
  selectIsWheelSpinning,
  selectWheelSpinProperties,
  stopSpin,
} from './wheelSlice';

type RotationState = { speed: number; rotation: number };

export const useWheelSpin = (
  drawWheel: (rotation: number) => void,
  onWheelSpinComplete: (rotation: number) => void
) => {
  const dispatch = useAppDispatch();
  const isWheelSpinning = useAppSelector(selectIsWheelSpinning);
  const { initialSpeed, duration } = useAppSelector(selectWheelSpinProperties);

  const lastIsWheelSpinning = useRef(false);
  const stateRef = useRef<{ speed: number; rotation: number }>({
    speed: 0,
    rotation: 0,
  });

  if (!lastIsWheelSpinning.current && isWheelSpinning) {
    stateRef.current.speed = initialSpeed;
    lastIsWheelSpinning.current = true;
  }

  const drag = duration > 0 ? -initialSpeed / duration : -Infinity;

  const drawWheelFrame = useCallback(
    (delta: number) => {
      stateRef.current = getRotation(drag, delta, stateRef.current);
      drawWheel(stateRef.current.rotation);
      if (stateRef.current.speed === 0) {
        lastIsWheelSpinning.current = false;
        dispatch(stopSpin());
        onWheelSpinComplete(stateRef.current.rotation);
      }
    },
    [dispatch, drag, drawWheel, onWheelSpinComplete]
  );

  useRequestAnimationFrame(drawWheelFrame, isWheelSpinning);

  // Set initial state on draw state change (initial draw, option change)
  useEffect(() => {
    stateRef.current = { speed: 0, rotation: 0 };
    drawWheel(0);
    dispatch(stopSpin());
  }, [dispatch, drawWheel]);
};

const getRotation = (
  drag: number,
  delta: number,
  currentState: RotationState
) => {
  const deltaSec = delta / 1000;
  const newSpeed = Math.max(currentState.speed + drag * deltaSec, 0);

  return {
    speed: newSpeed,
    rotation: currentState.rotation + newSpeed * deltaSec,
  };
};
