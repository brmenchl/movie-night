export const resizeCanvas = (ref: React.RefObject<HTMLCanvasElement>) => {
  const ctx = ref.current?.getContext('2d');
  const parent = ref.current?.parentElement;
  if (!ctx || !parent) return;
  const dpr = window.devicePixelRatio || 1;

  ctx.canvas.width = parent.offsetWidth * dpr;
  ctx.canvas.height = parent.offsetHeight * dpr;
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
};
