import { degToRad } from '../../../../utils/angles';
import { useWheelSpin } from './useWheelRotation';
import { useOnWheelSpinComplete } from './useWheelSelection';
import { makeColorGenerator } from './wheelColorGenerator';
import { A, F } from '@mobily/ts-belt';
import { useEffect, useMemo, useRef } from 'react';

type Bounds = [start: number, end: number];
type Position = [x: number, y: number];
type Dimensions = {
  bounds: Bounds;
  center: Position;
  radius: number;
};
type WheelOption = { id: string; displayName: string };
type WheelOptionView = {
  option: WheelOption;
  path: Path2D;
  bounds: Bounds;
};

// Start 0 at top rather than right
const rotationOffset = -90;

export const Wheel: React.FC<{
  options: readonly WheelOption[];
  radius: number;
}> = ({ options, radius }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    if (ref.current) {
      ctx.current = ref.current.getContext('2d')!;
    }
  }, []);

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
      ref.current.height = dimensions.bounds[0];
      ref.current.width = dimensions.bounds[1];
    }
  }, [dimensions]);

  const draw = useMemo(
    () => drawWheel(dimensions, options),
    [dimensions, options]
  );

  const handleWheelSpinComplete = useOnWheelSpinComplete(
    getItemAngle(options.length)
  );

  useWheelSpin(ctx.current, draw, handleWheelSpinComplete);

  return <canvas ref={ref}></canvas>;
};

const drawWheel =
  (dimensions: Dimensions, options: readonly WheelOption[]) =>
  (ctx: CanvasRenderingContext2D, rotation: number) => {
    ctx.clearRect(0, 0, ...dimensions.bounds);

    ctx.textBaseline = 'middle';
    ctx.font = '14px sans-serif';

    ctx.save();

    // Build paths:
    const bounds = getItemBounds(options.length, rotation);
    const optionViews = A.zipWith(bounds, options, ([start, end], option) => {
      const path = new Path2D();
      path.moveTo(...dimensions.center);
      path.arc(
        ...dimensions.center,
        dimensions.radius,
        degToRad(start),
        degToRad(end)
      );
      return { option, path, bounds: [start, end] as Bounds };
    });

    const getColor = makeColorGenerator(options.length /* using defaults */);

    drawItemBackgrounds(ctx, getColor, optionViews);
    drawItemLines(ctx, dimensions, optionViews);
    drawItemLabels(ctx, dimensions, optionViews);
    drawTicker(ctx, dimensions);
  };

const drawItemBackgrounds = (
  ctx: CanvasRenderingContext2D,
  getColor: (idx: number) => string,
  viewOptions: readonly WheelOptionView[]
) => {
  for (const [i, { path }] of viewOptions.entries()) {
    ctx.fillStyle = getColor(i);
    ctx.fill(path);
  }
};

const drawItemLines = (
  ctx: CanvasRenderingContext2D,
  dimensions: Dimensions,
  optionViews: readonly WheelOptionView[]
) => {
  ctx.translate(...dimensions.center);

  optionViews.forEach(({ bounds: [start] }) => {
    ctx.save();
    ctx.rotate(degToRad(start));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(dimensions.radius, 0);

    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();

    ctx.restore();
  });

  ctx.resetTransform();
};

const drawItemLabels = (
  ctx: CanvasRenderingContext2D,
  dimensions: Dimensions,
  optionViews: readonly WheelOptionView[]
) => {
  for (const { option, bounds } of optionViews) {
    ctx.save();

    ctx.translate(...dimensions.center);
    ctx.rotate(degToRad(getMidAngle(bounds)));

    ctx.fillStyle = '#000000';

    const { width: textWidth } = ctx.measureText(option.displayName);
    const textX = dimensions.radius / 2 - textWidth / 2;
    ctx.fillText(option.displayName, textX, 0);
    ctx.rotate(-degToRad(getMidAngle(bounds)));

    ctx.restore();
  }
};

const drawTicker = (ctx: CanvasRenderingContext2D, dimensions: Dimensions) => {
  const topPoint = [
    dimensions.center[0],
    dimensions.center[1] - dimensions.radius,
  ] as const;
  const tickerPoint = [topPoint[0], topPoint[1] + 15] as const;
  ctx.save();

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#000000';

  ctx.beginPath();
  ctx.moveTo(...tickerPoint);
  ctx.arc(...topPoint, 5, degToRad(-180), degToRad(0));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
};

const getItemBounds = (count: number, lastRotation: number) => {
  const itemAngle = getItemAngle(count);
  // Maybe check floating point if you see weird stuff
  return A.range(0, count).map((i) => {
    const startAngle = rotationOffset + lastRotation + itemAngle * i;
    return [startAngle, startAngle + itemAngle];
  });
};

const getItemAngle = (count: number) => 360 / count;

const getMidAngle = ([start, end]: Bounds) => start + (end - start) / 2;
