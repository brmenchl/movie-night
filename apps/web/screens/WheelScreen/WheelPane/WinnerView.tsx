import { O } from '@mobily/ts-belt';

import { useWinner } from '@packages/movies';

export const WinnerView = () => {
  const winner = useWinner();
  return O.match(
    winner,
    (movie) => <h1>{movie.title}</h1>,
    () => null
  );
};
