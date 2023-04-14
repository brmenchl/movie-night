import { useCallback, useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useRequestAnimationFrame = (
  callback: (delta: number) => void,
  isRunning: boolean
) => {
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  const cancel = () => {
    requestRef.current && cancelAnimationFrame(requestRef.current);
    requestRef.current = undefined;
    previousTimeRef.current = undefined;
  };

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current) callback(time - previousTimeRef.current);
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    if (isRunning) {
      cancel();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancel();
    }
    return cancel;
  }, [animate, isRunning]);
};
