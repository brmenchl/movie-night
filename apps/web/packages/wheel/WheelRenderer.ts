import { degToRad } from '@/core/utils/angles';

import { makeColorGenerator } from './wheelColorGenerator';
import { mostReadable } from '@ctrl/tinycolor';

// Start 0 at top rather than right
const rotationOffset = -90;
const initialSpeed = 40;
const duration = 10000;

const margin = 50;

export class WheelRenderer {
  private itemAngle: number = 360 / this.options.length;

  private get getColor() {
    return makeColorGenerator(this.options.length);
  }
  private radius: number;
  private dpr: number = window.devicePixelRatio || 1;
  private isSpinning: boolean = false;
  private rotation: number = 0;
  private startTime: number | null = null;
  private speed: number = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private options: readonly string[],
    private onSpinComplete: (itemIndex: number) => void,
  ) {
    // Adjust the size of the canvas's drawing buffer to match the device pixel ratio
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parent = this.ctx.canvas.parentElement!;
    this.resizeCanvas(parent);

    // Add an event listener for the window's resize event
    window.addEventListener('resize', () => this.onWindowResize(parent));
    this.ctx.canvas.addEventListener('click', () => this.spin());

    this.radius =
      Math.min(this.ctx.canvas.height, this.ctx.canvas.width) / 2 - margin;
    this.draw();
  }

  private resizeCanvas(parent: HTMLElement) {
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    this.ctx.canvas.width = width * this.dpr;
    this.ctx.canvas.height = height * this.dpr;

    this.radius =
      Math.min(this.ctx.canvas.height, this.ctx.canvas.width) / 2 - margin;
  }

  private onWindowResize(parent: HTMLElement) {
    this.resizeCanvas(parent);
    this.draw();
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

    // Save the context state before rotating
    this.ctx.save();
    this.ctx.rotate(degToRad(this.rotation));

    // Draw each option
    this.options.forEach((option, i) => {
      this.ctx.save();
      const start = rotationOffset + this.itemAngle * i;
      const end = start + this.itemAngle;

      // Line to start of arc
      this.ctx.moveTo(0, 0);
      this.ctx.beginPath();
      this.ctx.lineTo(
        this.radius * Math.cos(degToRad(start)),
        this.radius * Math.sin(degToRad(start)),
      );

      // Draw arc
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, this.radius, degToRad(start), degToRad(end));

      this.ctx.closePath();

      const sliceColor = this.getColor(i);
      this.ctx.fillStyle = sliceColor;
      this.ctx.fill();

      const angle = start + (end - start) / 2;
      const textRadius = this.radius - 60;
      this.ctx.translate(
        textRadius * Math.cos(degToRad(angle)),
        textRadius * Math.sin(degToRad(angle)),
      );
      this.ctx.rotate(degToRad(angle + 180));
      this.ctx.scale(1, 1.5);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.ctx.fillStyle = mostReadable(sliceColor, [
        '#000',
        '#fff',
      ])!.toHexString();
      this.ctx.font = `${this.radius * 0.03 * this.dpr}px Helvetica`;
      this.ctx.fontStretch = 'ultra-condensed';
      this.ctx.textAlign = 'start';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(option, 0, 0);

      this.ctx.restore();
    });

    this.ctx.restore();

    this.drawTicker();

    this.ctx.resetTransform();
  }

  public spin() {
    this.isSpinning = true;
    this.speed = initialSpeed;
    this.startTime = null;

    requestAnimationFrame(this.drawFrame.bind(this));
  }

  private drawFrame(currentTime: number) {
    this.draw();

    if (!this.isSpinning) {
      return;
    }

    // Update the rotation
    this.rotation += this.speed;

    // Gradually decrease the speed using easeOutExpo
    this.startTime ??= currentTime;
    const elapsed = currentTime - this.startTime;
    this.speed = Math.max(
      initialSpeed - this.easeOutExpo(elapsed, initialSpeed),
      0,
    );
    if (this.speed < 0.01) {
      this.isSpinning = false;
      this.startTime = null;
      this.speed = 0;
      this.onSpinComplete(this.itemIndexFromRotation(this.rotation));
    } else {
      // Otherwise, continue the animation
      requestAnimationFrame(this.drawFrame.bind(this));
    }
  }

  private drawTicker() {
    this.ctx.save();

    const arcRadius = 100;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, arcRadius, degToRad(-135), degToRad(-45), true);
    this.ctx.lineTo(0, -(arcRadius + 30));
    this.ctx.closePath();
    this.ctx.fillStyle = 'white';
    this.ctx.fill();

    this.ctx.restore();
  }

  private easeOutExpo(currentTime: number, totalSpeed: number) {
    return currentTime == duration
      ? totalSpeed
      : totalSpeed * (-Math.pow(2, (-10 * currentTime) / duration) + 1);
  }

  private itemIndexFromRotation(rotation: number) {
    const lastIndex = 360 / this.itemAngle - 1;
    // Rotation is going backwards through the array indices
    const normalizedRotation = rotation % 360;
    const backwardsIndices = Math.floor(normalizedRotation / this.itemAngle);
    return lastIndex - backwardsIndices;
  }
}
