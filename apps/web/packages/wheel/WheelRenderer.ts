import { degToRad } from '@/core/utils/angles';

import { makeColorGenerator } from './wheelColorGenerator';

// Start 0 at top rather than right
const rotationOffset = -90;
const initialSpeed = 40;
const duration = 10000;

const margin = 50;

export class WheelRenderer {
  private options: readonly string[] = [];
  private itemAngle: number = 0;

  private get getColor() {
    return makeColorGenerator(this.options.length);
  }
  private radius: number;
  private dpr: number = window.devicePixelRatio || 1;
  private isSpinning: boolean = false;
  private rotation: number = 0;
  private startTime: number | null = null;
  private speed: number = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    // Adjust the size of the canvas's drawing buffer to match the device pixel ratio
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parent = this.ctx.canvas.parentElement!;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;

    this.ctx.canvas.width = width * this.dpr;
    this.ctx.canvas.height = height * this.dpr;

    this.radius =
      Math.min(this.ctx.canvas.height, this.ctx.canvas.width) / 2 - margin;
  }

  public updateOptions(options: readonly string[]) {
    if (
      options.length === this.options.length &&
      options.every((value, index) => value === this.options[index])
    ) {
      return;
    }
    this.options = options;
    this.itemAngle = 360 / this.options.length;
    this.rotation = 0;
    this.stopSpin();
    if (this.options.length) {
      this.draw();
    }
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.translate(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);

    // Save the context state before rotating
    this.ctx.save();
    this.ctx.rotate(degToRad(this.rotation));

    // Draw each option
    this.options.forEach((option, i) => {
      const start = rotationOffset + this.itemAngle * i;
      const end = start + this.itemAngle;
      this.ctx.beginPath();

      // Line to start of arc
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(
        this.radius * Math.cos(degToRad(start)),
        this.radius * Math.sin(degToRad(start)),
      );

      // Draw arc
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, this.radius, degToRad(start), degToRad(end));

      // Line to end of arc
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(
        this.radius * Math.cos(degToRad(end)),
        this.radius * Math.sin(degToRad(end)),
      );

      this.ctx.stroke();
      this.ctx.fillStyle = this.getColor(i);
      this.ctx.fill();

      // Calculate midpoint angle of slice
      const midAngle = start + (end - start) / 2;

      // Set text properties
      this.ctx.fillStyle = 'black'; // Or any color you want for the text
      const dpr = window.devicePixelRatio || 1;
      this.ctx.font = `${16 * dpr}px Helvetica`;
      this.ctx.textBaseline = 'middle'; // Center the text vertically
      this.ctx.textAlign = 'center'; // Center the text horizontally

      // Calculate text position
      const textRadius = this.radius / 2; // Adjust as needed
      const xPos = textRadius * Math.cos(degToRad(midAngle));
      const yPos = textRadius * Math.sin(degToRad(midAngle));

      // Save the context state
      this.ctx.save();

      // Translate and rotate the context
      this.ctx.translate(xPos, yPos);
      this.ctx.rotate(degToRad(midAngle));

      this.ctx.scale(0.9, 1.5);

      // Draw text
      this.ctx.fillText(option, 0, 0);

      // Restore the context state
      this.ctx.restore();
    });

    this.ctx.restore();

    this.drawTicker();

    this.ctx.resetTransform();
  }

  public spin(onSpinComplete: (endRotation: number) => void) {
    this.isSpinning = true;
    this.speed = initialSpeed;
    this.startTime = null;

    requestAnimationFrame(this.drawFrame.bind(this, onSpinComplete));
  }

  public stopSpin() {
    this.isSpinning = false;
    this.startTime = null;
    this.speed = 0;
  }

  private drawFrame(
    onSpinComplete: (endRotation: number) => void,
    currentTime: number,
  ) {
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
      onSpinComplete(this.itemIndexFromRotation(this.rotation));
    } else {
      // Otherwise, continue the animation
      requestAnimationFrame(this.drawFrame.bind(this, onSpinComplete));
    }
  }

  private drawTicker() {
    const arcRadius = 20;
    const needleToCenter = 80;

    this.ctx.save();

    // Translate the context to the center of the arc
    this.ctx.translate(0, -this.radius + needleToCenter);

    // Set the color of the slice
    this.ctx.fillStyle = '#FFFFFF'; // Or any color you want for the slice
    this.ctx.strokeStyle = '#000000'; // Or any color you want for the outline

    // Draw the slice
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-arcRadius, -needleToCenter);
    this.ctx.arc(0, -needleToCenter, arcRadius, degToRad(180), degToRad(0));
    this.ctx.closePath();

    // Fill and outline the slice
    this.ctx.fill();
    this.ctx.stroke();

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
