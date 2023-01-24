import { useEffect, useRef } from "react";
import { makeColorGenerator } from "./wheelColorGenerator";

type WheelOption = { id: string; displayName: string };

const fontStyle = {
  weight: "bold",
  family: "sans-serif",
  size: "14px",
};

const Wheel: React.FC<{
  options: WheelOption[];
  radius: number;
}> = ({ options, radius }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.width = radius * 2;
      ref.current.height = radius * 2;
      const context = ref.current.getContext("2d")!;
      const arcAngle = (2 * Math.PI) / options.length;
      const renderOption = wheelOptionRenderer(context, radius, arcAngle);
      const renderOptionText = wheelTextRenderer(context, radius, arcAngle);

      context.translate(radius, radius);
      context.rotate(-Math.PI / 2);
      renderWheelBackground(context, radius);

      const getColorForIndex = makeColorGenerator(/* using defaults */);
      for (const [i, option] of options.entries()) {
        renderOption(getColorForIndex(i));
        renderOptionText(option.displayName);

        context.rotate(arcAngle);
      }
    }
  });

  return <canvas ref={ref}></canvas>;
};

const wheelOptionRenderer =
  (context: CanvasRenderingContext2D, radius: number, arcAngle: number) =>
  (color: string) => {
    context.save();
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(0, 0);
    context.arc(0, 0, radius, 0, arcAngle, false);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  };

const wheelTextRenderer =
  (context: CanvasRenderingContext2D, radius: number, arcAngle: number) =>
  (text: string) => {
    context.save();
    context.beginPath();
    context.font = `${fontStyle.weight} ${fontStyle.size} ${fontStyle.family}`;
    context.textBaseline = "middle";
    context.strokeStyle = "#FFFFFF";
    context.fillStyle = "#000000";
    context.moveTo(0, 0);
    context.rotate(arcAngle / 2);
    context.fillText(text, radius / 2, 0);
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
