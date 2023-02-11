import { useRemoveMovie } from './hooks';
import { makeSelectMovieById } from '@movies/movieSlice';
import { useAppSelector } from '@redux/hooks';
import TrashIcon from '@rsuite/icons/Trash';
import { useMemo } from 'react';
import Button from 'rsuite/Button';
import Stack from 'rsuite/Stack';

const MovieListItem: React.FC<{ id: string }> = (props) => {
  const selectMovieById = useMemo(makeSelectMovieById, []);
  const movie = useAppSelector((state) => selectMovieById(state, props.id));
  const removeMovie = useRemoveMovie(props.id);

  return movie ? (
    <Stack>
      <Stack.Item flex={1}>
        <p>{movie.title}</p>
      </Stack.Item>
      <Button color="red" appearance="primary" onClick={removeMovie}>
        <TrashIcon />
      </Button>
    </Stack>
  ) : null;
};

export default MovieListItem;
