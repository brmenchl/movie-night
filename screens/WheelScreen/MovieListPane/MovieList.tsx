import MovieListItem from './MovieListItem';
import { selectMovieIds } from '@movies/movieSlice';
import { useAppSelector } from '@redux/hooks';
import List from 'rsuite/List';

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
