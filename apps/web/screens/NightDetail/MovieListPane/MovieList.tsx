import { useMovieSelections } from '@packages/movies';

import { MovieListItem } from './MovieListItem';
import { useNightId } from '@packages/nights';

export const MovieList = () => {
  const nightId = useNightId();
  const movieSelections = useMovieSelections(nightId);
  return (
    <ul>
      {movieSelections.map((movieSelection) => (
        <li key={movieSelection.friendId} style={{ color: 'black' }}>
          <MovieListItem movieSelection={movieSelection} />
        </li>
      ))}
    </ul>
  );
};
