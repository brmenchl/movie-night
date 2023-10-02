import { useMovieSelections } from '@packages/movies';

import { MovieListItem } from './MovieListItem';
import { useNightId } from '@packages/nights';

export const MovieList = () => {
  const nightId = useNightId();
  const movieSelections = useMovieSelections(nightId);
  return (
    <ul className="flex flex-col gap-3 overflow-auto">
      {movieSelections.map((movieSelection) => (
        <li key={movieSelection.friendId}>
          <MovieListItem movieSelection={movieSelection} />
        </li>
      ))}
    </ul>
  );
};
