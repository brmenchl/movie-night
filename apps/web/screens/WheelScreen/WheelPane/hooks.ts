import { useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';

import { getWinnerQuery, useGetMovieSelections } from '@packages/movies';

export const useGetMovieWheelOptions = () =>
  pipe(
    useGetMovieSelections(),
    A.map(({ title }) => title)
  );

export const useGetWinner = () => {
  const { data } = useQuery(getWinnerQuery);
  return O.map(data?.night?.winningSelection, (selection) => ({
    friendId: selection.friend.id,
    title: selection.movie.title,
  }));
};
