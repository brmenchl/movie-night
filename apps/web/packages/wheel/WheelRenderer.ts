import { degToRad } from '@/core/utils/angles';

import { makeColorGenerator } from './wheelColorGenerator';

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

      // Calculate text position
      const angle = start + (end - start) / 2;
      const textRadius = this.radius / 2;
      this.renderText(option, {
        x: textRadius * Math.cos(degToRad(angle)),
        y: textRadius * Math.sin(degToRad(angle)),
        angle,
        size: 'big',
      });
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
    const arcRadius = 100;

    this.ctx.save();

    // Set the color of the slice
    this.ctx.fillStyle = '#FFFFFF'; // Or any color you want for the slice
    this.ctx.strokeStyle = '#000000'; // Or any color you want for the outline

    // Draw the slice
    this.ctx.beginPath();
    this.ctx.arc(0, 0, arcRadius, degToRad(-135), degToRad(-45), true);
    this.ctx.lineTo(0, -(arcRadius + 30));
    this.ctx.closePath();

    // Fill and outline the slice
    this.ctx.fill();
    this.ctx.stroke();

    this.renderText('SPIN\nTHAT\nWHEEL');

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

  private renderText(
    text: string,
    options: Partial<{
      x: number;
      y: number;
      angle: number;
      size: 'big' | 'small';
    }> = {},
  ) {
    // Save the context state
    this.ctx.save();
    // Set text properties
    this.ctx.fillStyle = 'black'; // Or any color you want for the text
    const fontSize = Math.floor(
      this.radius * (options.size === 'big' ? 0.03 : 0.014),
    );
    this.ctx.font = `${fontSize * this.dpr}px Helvetica`;
    this.ctx.textBaseline = 'middle'; // Center the text vertically
    this.ctx.textAlign = 'center'; // Center the text horizontally
    this.ctx.fontStretch = 'ultra-condensed';

    // Translate and rotate the context
    this.ctx.translate(options.x ?? 0, options.y ?? 0);
    this.ctx.rotate(degToRad(options.angle ?? 0));
    this.ctx.scale(1, 1.5);
    // Restore the context state
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
  }
}
