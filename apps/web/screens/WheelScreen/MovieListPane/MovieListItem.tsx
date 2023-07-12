import TrashIcon from '@rsuite/icons/Trash';
import { useCallback } from 'react';
import { ButtonGroup, IconButton, Input } from 'rsuite';
import Stack from 'rsuite/Stack';

import { useDeselectMovie } from '@packages/movies';

import { useMovieEditing } from './useMovieEditing';

export const MovieListItem = ({
  movieSelection,
}: {
  movieSelection: {
    nightId: string;
    friendId: string;
    title: string;
  };
}) => {
  const deselectMovie = useDeselectMovie(
    movieSelection.nightId,
    movieSelection.friendId,
  );

  const { inputRef, startEditing, title, setTitle, handleKeyPress } =
    useMovieEditing(movieSelection);

  const handleDeselectMovieClick = useCallback(
    () => deselectMovie(),
    [deselectMovie],
  );

  return movieSelection ? (
    <Stack>
      <Stack.Item flex={1}>
        <Input
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={setTitle}
          onKeyUp={handleKeyPress}
        />
      </Stack.Item>
      <ButtonGroup>
        <IconButton
          color="red"
          appearance="primary"
          onClick={handleDeselectMovieClick}
          icon={<TrashIcon />}
        />
      </ButtonGroup>
    </Stack>
  ) : null;
};
