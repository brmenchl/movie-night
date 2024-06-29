import { useCallback, useEffect, useRef } from 'react';
import { drawWheel } from './renderWheel';
import { spin } from './spin';
import { degToRad } from '@/core/utils/angles';
import { resizeCanvas } from './resizeCanvas';

export const Wheel = ({
  options,
  onSpinComplete,
}: {
  options: readonly string[];
  onSpinComplete: (itemIndex: number) => void;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const spinAbortController = useRef<AbortController>();

  const onSpinClick = useCallback(async () => {
    spinAbortController.current = new AbortController();
    const endRotation = await spin({
      initialSpeed: 40,
      duration: 30000,
      onProgress: (rotation) => {
        const ctx = ref.current?.getContext('2d');
        if (!ctx) return;
        ctx.save();
        ctx.rotate(degToRad(rotation));
        drawWheel(ref, options);
        ctx.restore();
      },
      signal: spinAbortController.current.signal,
    });
    onSpinComplete(itemIndexFromRotation(360 / options.length, endRotation));
  }, [onSpinComplete, options]);

  useEffect(() => {
    spinAbortController.current?.abort();
    resizeCanvas(ref);
    drawWheel(ref, options);
  }, [onSpinComplete, options]);

  return (
    <div className="h-[90%] w-[90%] flex items-center justify-center">
      <canvas ref={ref} className="w-full h-full" />

      <button
        onClick={onSpinClick}
        className="absolute h-[100px] w-[100px] rotate-45 bg-white drop-shadow-xl hover:drop-shadow-2xl duration-300 ease-in-out rounded-b-full rounded-tr-full"
      >
        <p className="-rotate-45">
          spin
          <br />
          that
          <br />
          wheel
        </p>
      </button>
    </div>
  );
};

const itemIndexFromRotation = (itemAngle: number, rotation: number) => {
  const lastIndex = 360 / itemAngle - 1;
  // Rotation is going backwards through the array indices
  const normalizedRotation = rotation % 360;
  const backwardsIndices = Math.floor(normalizedRotation / itemAngle);
  return lastIndex - backwardsIndices;
};
