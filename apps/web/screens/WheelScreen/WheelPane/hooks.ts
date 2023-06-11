import { A, pipe } from '@mobily/ts-belt';

import { useMovieSelections } from '@packages/movies';

export const useGetMovieWheelOptions = () =>
  pipe(
    useMovieSelections(),
    A.map(({ title }) => title)
  );