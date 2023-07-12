import { A } from '@mobily/ts-belt';

import { degToRad } from '@core/utils/angles';

import { Bounds, Dimensions, WheelOptionView } from './models';
import { makeColorGenerator } from './wheelColorGenerator';

// Start 0 at top rather than right
const rotationOffset = -90;

export const drawWheel =
  (
    ctx: CanvasRenderingContext2D,
    dimensions: Dimensions,
    options: readonly string[],
  ) =>
  (rotation: number) => {
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
        degToRad(end),
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
  viewOptions: readonly WheelOptionView[],
) =>
  A.forEachWithIndex(viewOptions, (i, { path }) => {
    ctx.fillStyle = getColor(i);
    ctx.fill(path);
  });

const drawItemLines = (
  ctx: CanvasRenderingContext2D,
  dimensions: Dimensions,
  optionViews: readonly WheelOptionView[],
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
  optionViews: readonly WheelOptionView[],
) => {
  for (const { option, bounds } of optionViews) {
    ctx.save();

    ctx.translate(...dimensions.center);
    ctx.rotate(degToRad(getMidAngle(bounds)));

    ctx.fillStyle = '#000000';

    const { width: textWidth } = ctx.measureText(option);
    const textX = dimensions.radius / 2 - textWidth / 2;
    ctx.fillText(option, textX, 0);
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

export const getItemAngle = (count: number) => 360 / count;

const getMidAngle = ([start, end]: Bounds) => start + (end - start) / 2;
