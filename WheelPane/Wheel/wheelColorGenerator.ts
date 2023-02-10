import { A } from "@mobily/ts-belt";

const defaultTheme = ["#0275d8", "#5cb85c", "#5bc0de", "#f0ad4e", "#d9534f"];

export const makeColorGenerator = (theme: readonly string[] = []) => {
  if (A.isEmpty(theme)) theme = defaultTheme;
  if (theme.length >= 3) {
    return cycleColorWithEndProtection(theme[0], theme[1], A.drop(theme, 2));
  }
  return cycleColor(theme);
};

const cycleColor = (colors: readonly string[]) => (idx: number) =>
  colors[idx % colors.length];

const cycleColorWithEndProtection =
  (head1: string, head2: string, rest: readonly string[]) => (idx: number) => {
    if (idx === rest.length + 2) return head2;
    return cycleColor([head1, head2, ...rest])(idx);
  };
