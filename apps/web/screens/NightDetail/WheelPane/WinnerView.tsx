import { O } from '@mobily/ts-belt';

import { useWinner } from '@packages/movies';
import { useNightId } from '@packages/nights';

export const WinnerView = () => {
  const nightId = useNightId();
  const winner = useWinner(nightId);
  return O.match(
    winner,
    (movie) => <h1>{movie.title}</h1>,
    () => null,
  );
};
