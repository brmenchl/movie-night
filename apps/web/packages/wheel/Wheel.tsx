import { useEffect, useRef, useState } from 'react';

import { WheelRenderer } from './WheelRenderer';
import { Button } from '@/components/ui/button';

export const Wheel = ({
  options,
  onSpinComplete,
}: {
  options: readonly string[];
  onSpinComplete: (itemIndex: number) => void;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<WheelRenderer>();
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ctx = ref.current.getContext('2d')!;
      const r = new WheelRenderer(ctx, options);
      setRenderer(r);
    }
  }, [options]);

  useEffect(() => {
    if (renderer) {
      if (isWheelSpinning) {
        renderer.spin((itemIndex) => {
          setIsWheelSpinning(false);
          onSpinComplete(itemIndex);
        });
      } else {
        renderer.stopSpin();
      }
    }
  }, [isWheelSpinning, onSpinComplete, renderer]);

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
      <Button onClick={() => setIsWheelSpinning(true)}>Spin that wheel!</Button>
      <canvas ref={ref} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
