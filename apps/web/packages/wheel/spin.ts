export const spin = (options: {
  initialSpeed: number;
  duration: number;
  onProgress: (rotation: number) => void;
  signal: AbortSignal;
}) => {
  let speed = options.initialSpeed;
  let startTime: number | null = null;
  let rotation = 0;

  return new Promise<number>((resolve) => {
    const drawFrame = (currentTime: number) => {
      if (options.signal.aborted) {
        return;
      }

      options.onProgress(rotation);
      // Update the rotation
      rotation += speed;

      startTime ??= currentTime;
      const elapsedTime = currentTime - startTime;
      speed = Math.max(
        options.initialSpeed -
          easeOutExpo({
            elapsedTime,
            totalSpeed: options.initialSpeed,
            duration: options.duration,
          }),
        0,
      );

      if (speed < 0.1) {
        resolve(rotation);
      } else {
        // Otherwise, continue the animation
        requestAnimationFrame(drawFrame);
      }
    };

    requestAnimationFrame(drawFrame);
  });
};

const easeOutExpo = ({
  elapsedTime,
  totalSpeed,
  duration,
}: {
  elapsedTime: number;
  totalSpeed: number;
  duration: number;
}) =>
  elapsedTime == duration
    ? totalSpeed
    : totalSpeed * (-Math.pow(2, (-10 * elapsedTime) / duration) + 1);
