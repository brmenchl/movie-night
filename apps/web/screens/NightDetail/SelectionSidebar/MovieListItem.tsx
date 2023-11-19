import { useCallback } from 'react';

import { useDeselectMovie } from '@packages/movies';

import { useMovieEditing } from './useMovieEditing';
import { Button } from '@components/Button';
import { useFriend } from '@packages/friends';
import { Trash2Icon } from 'lucide-react';
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
  const friend = useFriend(movieSelection.friendId);
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
    <InputWithAddon
      ref={inputRef}
      value={title}
      onFocus={startEditing}
      onChange={(e) => setTitle(e.target.value)}
      onKeyUp={handleKeyPress}
      subText={
        <div className="border-t-2 border-slate-400 px-4">
          <p className="text-gray-400">{friend?.name}</p>
        </div>
      }
    >
      <Button.Wrapper className="flex-1 p-2" onClick={handleDeselectMovieClick}>
        <Trash2Icon />
      </Button.Wrapper>
    </InputWithAddon>
  );
};
