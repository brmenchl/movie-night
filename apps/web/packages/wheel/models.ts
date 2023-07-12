export type Bounds = [start: number, end: number];
type Position = [x: number, y: number];
export type Dimensions = {
  bounds: Bounds;
  center: Position;
  radius: number;
};
export type WheelOptionView = {
  option: string;
  path: Path2D;
  bounds: Bounds;
};
