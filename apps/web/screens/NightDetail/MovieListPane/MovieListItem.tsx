import { useCallback } from 'react';

import { useDeselectMovie } from '@packages/movies';

import { useMovieEditing } from './useMovieEditing';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { Input } from '@components/Input';

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
    <div>
      <div className="flex-1">
        <Input
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleKeyPress}
        />
      </div>
      <Button.Icon color="red" onClick={handleDeselectMovieClick}>
        <Icon.Trash />
      </Button.Icon>
    </div>
  );
};
