import TrashIcon from '@rsuite/icons/Trash';
import { useCallback } from 'react';
import { IconButton, Input, Stack } from 'rsuite';

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

  const handleDeselectMovieClick = useCallback(() => {
    deselectMovie();
  }, [deselectMovie]);

  return (
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
      <IconButton
        color="red"
        appearance="primary"
        onClick={handleDeselectMovieClick}
        icon={<TrashIcon />}
      />
    </Stack>
  );
};
