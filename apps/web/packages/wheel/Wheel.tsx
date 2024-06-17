import { useEffect, useRef } from 'react';

import { WheelRenderer } from './WheelRenderer';
import { A, F } from '@mobily/ts-belt';

export const Wheel = ({
  options,
  onSpinComplete,
}: {
  options: readonly string[];
  onSpinComplete: (itemIndex: number) => void;
}) => {
  const lastOptions = useRef<readonly string[]>();
  const renderer = useRef<WheelRenderer>();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (
        !lastOptions.current ||
        !A.eq(options, lastOptions.current, F.equals)
      ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const ctx = ref.current.getContext('2d')!;
        lastOptions.current = options;
        renderer.current = new WheelRenderer(ctx, options, onSpinComplete);
      }
    }
  }, [onSpinComplete, options]);

  return (
    <div className="h-[90%] w-[90%] flex items-center justify-center">
      <canvas ref={ref} className="w-full h-full" />

      <button
        onClick={() => renderer.current?.spin()}
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
