export type Bounds = [start: number, end: number];
export type Position = [x: number, y: number];
export type Dimensions = {
  bounds: Bounds;
  center: Position;
  radius: number;
};
export type WheelOption = { id: string; displayName: string };
export type WheelOptionView = {
  option: WheelOption;
  path: Path2D;
  bounds: Bounds;
};
