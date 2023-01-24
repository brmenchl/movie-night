import { A } from "@mobily/ts-belt";
import { useEffect, useRef } from "react";

type WheelOption = { id: string; displayName: string };

// FUTURE PROPS
const defaultColors = ["#fcb25c", "#00FFFF", "#0F0F"];

const fontStyle = {
  weight: "bold",
  family: "sans-serif",
  size: "14px",
};

const pickRandom = <T,>(xs: T[]): T =>
  xs[Math.floor(Math.random() * xs.length)];

const getColors = (colorTheme: string[], count: number) =>
  A.range(0, count).reduce(
    ({ last, colors }, i) => {
      const color = pickRandom(
        colorTheme.filter(
          (c) => c !== last && !(i === count - 1 && c === colors[0])
        )
      );
      return {
        last: color,
        colors: [...colors, color],
      };
    },
    { last: "", colors: [] as string[] }
  ).colors;

const Wheel: React.FC<{
  options: WheelOption[];
  radius: number;
  colors?: string[];
}> = ({ options, radius, colors: colorTheme = defaultColors }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.width = radius * 2;
      ref.current.height = radius * 2;
      const context = ref.current.getContext("2d")!;
      const arcAngle = (2 * Math.PI) / options.length;
      const renderOption = wheelOptionRenderer(context, radius, arcAngle);
      context.font = `${fontStyle.weight} ${fontStyle.size} ${fontStyle.family}`;
      context.textBaseline = "middle";
      context.strokeStyle = "#FFFFFF";

      context.translate(radius, radius);
      context.rotate(-Math.PI / 2);
      renderWheelBackground(context, radius);

      const optionColors = getColors(colorTheme, options.length);
      for (const [i, option] of options.entries()) {
        renderOption(option, optionColors[i]);
        context.rotate(arcAngle);
      }
    }
  });

  return <canvas ref={ref}></canvas>;
};

const wheelOptionRenderer =
  (context: CanvasRenderingContext2D, radius: number, arcAngle: number) =>
  (option: WheelOption, color: string) => {
    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(0, 0);
    context.arc(0, 0, radius, 0, arcAngle, false);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();

    context.save();
    context.beginPath();
    context.fillStyle = "#000000";
    context.moveTo(0, 0);
    context.rotate(arcAngle / 2);
    context.fillText(option.displayName, radius / 2, 0);
    context.restore();
  };

const renderWheelBackground = (
  context: CanvasRenderingContext2D,
  radius: number
) => {
  context.beginPath();
  context.arc(0, 0, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "#ccc";
  context.fill();
};

export default Wheel;
