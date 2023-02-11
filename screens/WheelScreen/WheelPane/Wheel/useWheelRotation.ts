import {
  selectIsWheelSpinning,
  selectWheelSpinProperties,
  stopSpin,
} from '../wheelSlice';
import {
  useAppDispatch,
  useAppSelector,
  useRequestAnimationFrame,
} from '@redux/hooks';
import { useCallback, useEffect, useRef } from 'react';

type RotationState = { speed: number; rotation: number };

export const useWheelSpin = (
  ctx: CanvasRenderingContext2D | undefined,
  drawWheel: (ctx: CanvasRenderingContext2D, rotation: number) => void,
  onWheelSpinComplete: (rotation: number) => void
) => {
  const dispatch = useAppDispatch();
  const isWheelSpinning = useAppSelector(selectIsWheelSpinning);
  const { initialSpeed, duration } = useAppSelector(selectWheelSpinProperties);

  const stateRef = useRef<{ speed: number; rotation: number }>({
    speed: 0,
    rotation: 0,
  });

  const drag = -initialSpeed / duration;

  const rotate = useCallback(
    (delta: number) => {
      stateRef.current = getRotation(drag, delta, stateRef.current);
    },
    [drag]
  );

  const draw = useCallback(
    (delta: number) => {
      if (ctx) {
        rotate(delta);
        drawWheel(ctx, stateRef.current.rotation);
        if (stateRef.current.speed === 0) {
          dispatch(stopSpin());
          onWheelSpinComplete(stateRef.current.rotation);
        }
      }
    },
    [dispatch, ctx, drawWheel, onWheelSpinComplete, rotate]
  );

  // Set initial state on draw state change (initial draw, option change)
  useEffect(() => {
    if (ctx) {
      stateRef.current = { speed: 0, rotation: 0 };
      drawWheel(ctx, 0);
      dispatch(stopSpin());
    }
  }, [dispatch, ctx, drawWheel]);

  useEffect(() => {
    if (isWheelSpinning) {
      stateRef.current.speed = initialSpeed;
    }
  }, [isWheelSpinning, initialSpeed]);

  useRequestAnimationFrame(draw, !!ctx && isWheelSpinning);
};

const getRotation = (
  drag: number,
  delta: number,
  currentState: RotationState
): RotationState => {
  const deltaSec = delta / 1000;
  const newSpeed = Math.max(currentState.speed + drag * deltaSec, 0);

  return {
    speed: newSpeed,
    rotation: currentState.rotation + newSpeed * deltaSec,
  };
};
