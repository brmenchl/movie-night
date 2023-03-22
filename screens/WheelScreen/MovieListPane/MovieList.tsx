import List from 'rsuite/List';

import { useAppSelector } from '@core/redux/hooks';

import { selectMovieIds } from '@packages/movies';

import MovieListItem from './MovieListItem';

const MovieList: React.FC = () => {
  const movieIds = useAppSelector(selectMovieIds);
  return (
    <List size="md">
      {movieIds.map((movieId, index) => (
        <List.Item key={movieId} index={index} style={{ color: 'black' }}>
          <MovieListItem id={movieId} />
        </List.Item>
      ))}
    </List>
  );
};

export default MovieList;
