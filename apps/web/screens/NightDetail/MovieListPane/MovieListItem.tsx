import TrashIcon from '@rsuite/icons/Trash';
import { useCallback } from 'react';
import { IconButton, Input } from 'rsuite';

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
    <div className="flex flex-row">
      <div className="flex-1">
        <Input
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={setTitle}
          onKeyUp={handleKeyPress}
        />
      </div>
      <IconButton
        color="red"
        appearance="primary"
        onClick={handleDeselectMovieClick}
        icon={<TrashIcon />}
      />
    </div>
  );
};
