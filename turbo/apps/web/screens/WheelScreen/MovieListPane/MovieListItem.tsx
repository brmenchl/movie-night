import TrashIcon from '@rsuite/icons/Trash';
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { ButtonGroup, IconButton, Input } from 'rsuite';
import Stack from 'rsuite/Stack';

import { useAppSelector } from '../../../core/redux/hooks';

import { Movie, makeSelectMovieById, updateMovie } from '@packages/movies';

import { useRemoveMovie } from './hooks';

const useMovieEditing = (savedMovie: Movie) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(savedMovie.title);

  const save = useCallback(
    () => dispatch(updateMovie({ id: savedMovie.id, title })),
    [dispatch, savedMovie.id, title]
  );

  const cancel = useCallback(() => {
    inputRef.current?.blur();
    setTitle(savedMovie.title);
  }, [savedMovie.title]);

  const handleKeyPress = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        save();
      }
    },
    [save]
  );

  const escFunction = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancel();
      }
    },
    [cancel]
  );

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('keydown', escFunction, true);
    }
    return () => {
      document.removeEventListener('keydown', escFunction, true);
    };
  }, [escFunction, isEditing]);

  return {
    isEditing,
    startEditing: useCallback(() => setIsEditing(true), [setIsEditing]),
    title,
    setTitle,
    handleKeyPress,
    inputRef,
  };
};

const MovieListItem = (props: { id: string }) => {
  const selectMovieById = useMemo(makeSelectMovieById, []);
  const movie = useAppSelector((state) => selectMovieById(state, props.id));
  const removeMovie = useRemoveMovie(props.id);

  const { inputRef, startEditing, title, setTitle, handleKeyPress } =
    useMovieEditing(movie);

  return movie ? (
    <Stack>
      <Stack.Item flex={1}>
        <Input
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={setTitle}
          onKeyPress={handleKeyPress}
        />
      </Stack.Item>
      <ButtonGroup>
        <IconButton
          color="red"
          appearance="primary"
          onClick={removeMovie}
          icon={<TrashIcon />}
        />
      </ButtonGroup>
    </Stack>
  ) : null;
};

export default MovieListItem;
