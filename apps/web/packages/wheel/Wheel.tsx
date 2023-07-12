import { F } from '@mobily/ts-belt';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Dimensions } from './models';
import { useOnWheelSpinComplete } from './useOnWheelSpinComplete';
import { useWheelSpin } from './useWheelRotation';
import { drawWheel, getItemAngle } from './wheelRendering';

export const Wheel = ({
  options,
  radius,
}: {
  options: readonly string[];
  radius: number;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();

  const dimensions = useMemo<Dimensions>(() => {
    const margin = 50;
    const bound = radius * 2 + margin * 2;
    return {
      bounds: [bound, bound],
      center: [margin + radius, margin + radius],
      radius,
    };
  }, [radius]);

  useEffect(() => {
    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setCtx(ref.current.getContext('2d')!);
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.height = dimensions.bounds[0];
      ref.current.width = dimensions.bounds[1];
    }
  }, [dimensions]);

  const handleWheelSpinComplete = useOnWheelSpinComplete(
    getItemAngle(options.length),
  );

  const draw = useMemo(
    () => (ctx ? drawWheel(ctx, dimensions, options) : F.ignore),
    [ctx, dimensions, options],
  );

  useWheelSpin(draw, handleWheelSpinComplete);

  return <canvas ref={ref}></canvas>;
};
