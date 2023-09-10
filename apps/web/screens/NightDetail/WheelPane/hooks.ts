import { A } from '@mobily/ts-belt';

import { useMovieSelections } from '@packages/movies';
import { useNightId } from '@packages/nights';

export const useGetMovieWheelOptions = () => {
  const nightId = useNightId();

  return A.map(useMovieSelections(nightId), ({ title }) => title);
};
