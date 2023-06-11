import List from 'rsuite/List';

import { MovieListItem } from './MovieListItem';
import { useGetMovieSelections } from './hooks/queryHooks';

export const MovieList = () => {
  const movieSelections = useGetMovieSelections();
  return (
    <List size="md">
      {movieSelections.map((movieSelection, index) => (
        <List.Item
          key={movieSelection.friendId}
          index={index}
          style={{ color: 'black' }}
        >
          <MovieListItem movieSelection={movieSelection} />
        </List.Item>
      ))}
    </List>
  );
};
