import { useCallback } from 'react';

import { useDeselectMovie } from '@packages/movies';

import { useMovieEditing } from './useMovieEditing';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import { InputWithAddon } from '@components/Input';

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
        <InputWithAddon
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleKeyPress}
        >
          <Button.Wrapper
            className="flex-1 p-2"
            onClick={handleDeselectMovieClick}
          >
            <Icon.Trash />
          </Button.Wrapper>
        </InputWithAddon>
      </div>
    </div>
  );
};
