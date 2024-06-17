import { degToRad } from '@/core/utils/angles';
import { mostReadable } from '@ctrl/tinycolor';
import { makeColorGenerator } from './wheelColorGenerator';
import type { RefObject } from 'react';

const rotationOffset = -90;
const margin = 50;

const dpr = () => window.devicePixelRatio || 1;

export const drawWheel = (
  canvas: RefObject<HTMLCanvasElement>,
  options: readonly string[],
) => {
  const itemAngle = 360 / (options.length || 1);
  const getColor = makeColorGenerator(options.length);

  const ctx = canvas.current?.getContext('2d');
  if (!ctx) return;

  ctx.save();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  options.forEach((option, i) =>
    drawOption(ctx, { option, itemAngle, i, color: getColor(i) }),
  );

  ctx.restore();
};

const drawOption = (
  ctx: CanvasRenderingContext2D,
  {
    option,
    itemAngle,
    i,
    color,
  }: {
    option: string;
    itemAngle: number;
    i: number;
    color: string;
  },
) => {
  ctx.save();
  const radius = Math.min(ctx.canvas.height, ctx.canvas.width) / 2 - margin;
  const start = rotationOffset + itemAngle * i;
  const end = start + itemAngle;

  // Line to start of arc
  ctx.moveTo(0, 0);
  ctx.beginPath();
  ctx.lineTo(
    radius * Math.cos(degToRad(start)),
    radius * Math.sin(degToRad(start)),
  );

  // Draw arc
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, radius, degToRad(start), degToRad(end));

  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();

  const angle = start + (end - start) / 2;
  const textRadius = radius - 60;
  ctx.translate(
    textRadius * Math.cos(degToRad(angle)),
    textRadius * Math.sin(degToRad(angle)),
  );
  ctx.rotate(degToRad(angle + 180));
  ctx.scale(1, 1.5);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ctx.fillStyle = mostReadable(color, ['#000', '#fff'])!.toHexString();
  ctx.font = `${radius * 0.03 * dpr()}px Helvetica`;
  ctx.fontStretch = 'ultra-condensed';
  ctx.textAlign = 'start';
  ctx.textBaseline = 'middle';
  ctx.fillText(option, 0, 0);

  ctx.restore();
};
