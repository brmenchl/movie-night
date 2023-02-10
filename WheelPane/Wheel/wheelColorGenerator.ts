import { A } from "@mobily/ts-belt";

const defaultTheme = ["#0275d8", "#5cb85c", "#5bc0de", "#f0ad4e", "#d9534f"];

export const makeColorGenerator = (
  count: number,
  theme: readonly string[] = []
) => {
  if (A.isEmpty(theme)) theme = defaultTheme;
  const [head, ...rest] = theme;
  return cycleColorWithEndProtection(count, [head, ...rest]);
};

const cycleColorWithEndProtection =
  (count: number, theme: readonly [string, ...string[]]) => (idx: number) => {
    if (idx === count - 1 && idx === theme.length) {
      return theme[Math.max(idx - 2, 0)];
    }
    return theme[idx % theme.length];
  };
