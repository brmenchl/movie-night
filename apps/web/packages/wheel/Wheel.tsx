import { useEffect, useRef } from 'react';

import { WheelRenderer } from './WheelRenderer';
import { Button } from '@/components/ui/button';
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
        renderer.current = new WheelRenderer(ctx, options);
      }
    }
  }, [options]);

  return (
    <div
      style={{
        height: '70%',
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Button onClick={() => renderer.current?.spin(onSpinComplete)}>
        Spin that wheel!
      </Button>
      <canvas ref={ref} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
