import { selectIsWheelSpinning, stopSpin } from "@movies/WheelPane/wheelSlice";
import {
  useAppDispatch,
  useAppSelector,
  useRequestAnimationFrame,
} from "@redux/hooks";
import { useCallback, useEffect, useRef } from "react";

const drag = 35;

type RotationState = { speed: number; rotation: number };
const initialSpeed = 100;

export const useWheelRotation = (
  ctx: CanvasRenderingContext2D | undefined,
  drawWheel: (ctx: CanvasRenderingContext2D, rotation: number) => void
) => {
  const dispatch = useAppDispatch();
  const isWheelSpinning = useAppSelector(selectIsWheelSpinning);

  const stateRef = useRef<{ speed: number; rotation: number }>({
    speed: 0,
    rotation: 0,
  });

  const draw = useCallback(
    (delta: number) => {
      if (ctx) {
        stateRef.current = getRotation(delta, stateRef.current);
        drawWheel(ctx, stateRef.current.rotation);
        if (stateRef.current.speed === 0) {
          dispatch(stopSpin());
        }
      }
    },
    [ctx, drawWheel, dispatch]
  );

  // Set initial state on draw state change (initial draw, option change)
  useEffect(() => {
    if (ctx) {
      stateRef.current = { speed: 0, rotation: 0 };
      draw(0);
    }
  }, [ctx, draw]);

  useEffect(() => {
    if (isWheelSpinning) {
      stateRef.current.speed = initialSpeed;
    }
  }, [isWheelSpinning]);

  useRequestAnimationFrame(draw, !!ctx && isWheelSpinning);
};

const getRotation = (
  delta: number,
  currentState: RotationState
): RotationState => {
  const deltaSec = delta / 1000;
  const newSpeed = Math.max(currentState.speed - drag * deltaSec, 0);

  return {
    speed: newSpeed,
    rotation: currentState.rotation + newSpeed * deltaSec,
  };
};
