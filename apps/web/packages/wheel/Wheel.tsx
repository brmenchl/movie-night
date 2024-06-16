import { useEffect, useRef } from 'react';

import { WheelRenderer } from './WheelRenderer';
import { A, F } from '@mobily/ts-belt';
import { Button } from '@/components/ui/button';

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
  }, [options]);

  return (
    <div
      style={{
        height: '90%',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <canvas
        ref={ref}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
      <button
        onClick={() => renderer.current?.spin()}
        style={{ position: 'absolute', height: 100, width: 100 }}
      >
        SPIN
        <br />
        THAT
        <br />
        WHEEL
      </button>
    </div>
  );
};
