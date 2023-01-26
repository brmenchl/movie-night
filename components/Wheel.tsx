import { A, F } from "@mobily/ts-belt";
import { useEffect, useMemo, useRef } from "react";
import { degToRad } from "../utils/angles";
import { makeColorGenerator } from "./wheelColorGenerator";
import { useWheelRotation } from "./useWheelRotation";

type Bounds = [start: number, end: number];
type WheelOption = { id: string; displayName: string };
type WheelOptionView = {
  option: WheelOption;
  path: Path2D;
  bounds: Bounds;
};

// Start 0 at top rather than right
const rotationOffset = -90;

export const Wheel: React.FC<{
  options: WheelOption[];
  radius: number;
}> = ({ options, radius }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    if (ref.current) {
      ctx.current = ref.current.getContext("2d")!;
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.height = radius * 2;
      ref.current.width = radius * 2;
    }
  }, [radius]);

  const cb = useMemo(() => draw(radius, options), [radius, options]);

  useWheelRotation(ctx.current, cb);

  return <canvas ref={ref}></canvas>;
};

const draw =
  (radius: number, options: WheelOption[]) =>
  (ctx: CanvasRenderingContext2D, rotation: number) => {
    ctx.clearRect(0, 0, radius * 2, radius * 2);
    const center = [radius, radius] as const;

    ctx.textBaseline = "middle";
    ctx.font = "14px sans-serif";

    ctx.save();

    // Build paths:
    const bounds = getItemBounds(options.length, rotation);
    const optionViews = A.zipWith(bounds, options, ([start, end], option) => {
      const path = new Path2D();
      path.moveTo(...center);
      path.arc(...center, radius, degToRad(start), degToRad(end));
      return { option, path, bounds: [start, end] as Bounds };
    });

    const getColor = makeColorGenerator(/* using defaults */);

    drawItemBackgrounds(ctx, getColor, optionViews);
    drawItemLines(ctx, center, radius, optionViews);
    drawItemLabels(ctx, center, radius, optionViews);
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
  center: readonly [number, number],
  radius: number,
  optionViews: readonly WheelOptionView[]
) => {
  ctx.translate(...center);

  optionViews.forEach(({ bounds: [start] }) => {
    ctx.save();
    ctx.rotate(degToRad(start));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);

    ctx.strokeStyle = "#FFFFFF";
    ctx.stroke();

    ctx.restore();
  });

  ctx.resetTransform();
};

const drawItemLabels = (
  ctx: CanvasRenderingContext2D,
  center: readonly [x: number, y: number],
  radius: number,
  optionViews: readonly WheelOptionView[]
) => {
  for (const { option, path, bounds } of optionViews) {
    ctx.save();

    ctx.translate(...center);
    ctx.rotate(degToRad(getMidAngle(bounds)));

    ctx.fillStyle = "#000000";

    const { width: textWidth } = ctx.measureText(option.displayName);
    const textX = radius / 2 - textWidth / 2;
    ctx.fillText(option.displayName, textX, 0);
    ctx.rotate(-degToRad(getMidAngle(bounds)));

    ctx.restore();
  }
};

const getItemBounds = (count: number, lastRotation: number) => {
  const itemAngle = 360 / count;

  // Maybe check floating point if you see weird stuff
  return A.range(0, count).map((i) => {
    const startAngle = rotationOffset + lastRotation + itemAngle * i;
    return [startAngle, startAngle + itemAngle];
  });
};

const getMidAngle = ([start, end]: Bounds) => start + (end - start) / 2;
