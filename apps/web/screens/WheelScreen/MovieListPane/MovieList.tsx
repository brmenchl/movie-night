import List from 'rsuite/List';

import { useMovieSelections } from '@packages/movies';

import { MovieListItem } from './MovieListItem';

export const MovieList = () => {
  const movieSelections = useMovieSelections();
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
