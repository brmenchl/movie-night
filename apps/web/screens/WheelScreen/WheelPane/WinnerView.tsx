import { O } from '@mobily/ts-belt';

import { useGetWinner } from './hooks';

export const WinnerView = () => {
  const winner = useGetWinner();
  return O.match(
    winner,
    (movie) => <h1>{movie.title}</h1>,
    () => null
  );
};
