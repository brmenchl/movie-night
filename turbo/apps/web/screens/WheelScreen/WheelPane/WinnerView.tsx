import { O } from '@mobily/ts-belt';

import { useAppSelector } from '../../../core/redux/hooks';

import { selectWinnerMovie } from '@packages/movies';

export const WinnerView: React.FC = () => {
  const winnerMovie = useAppSelector(selectWinnerMovie);
  return O.match(
    winnerMovie,
    (movie) => <h1>{movie.title}</h1>,
    () => null
  );
};
