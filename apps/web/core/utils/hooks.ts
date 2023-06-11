import { useCallback, useEffect, useRef } from 'react';

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
