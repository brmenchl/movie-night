import { type RefObject, useEffect } from 'react';

export const useCanvasResizer = (canvasRef: RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const parent = ctx.canvas.parentElement!;
      onWindowResize(parent, ctx);
      const destroyController = new AbortController();
      window.addEventListener('resize', () => onWindowResize(parent, ctx), {
        signal: destroyController.signal,
      });
      return () => destroyController.abort();
    }
  }, [canvasRef]);
};

const onWindowResize = (parent: HTMLElement, ctx: CanvasRenderingContext2D) => {
  const width = parent.offsetWidth;
  const height = parent.offsetHeight;
  const dpr = window.devicePixelRatio || 1;

  ctx.canvas.width = width * dpr;
  ctx.canvas.height = height * dpr;
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
};
