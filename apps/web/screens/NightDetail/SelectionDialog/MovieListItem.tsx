import { useDeselectMovie } from '@/packages/movies';

import { TrashIcon } from '@radix-ui/react-icons';
import { useMovieEditing } from './useMovieEditing';
import { useFriend } from '@/packages/friends';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const MovieSelectionCell = ({
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

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      {friend?.name}
      <Input
        ref={inputRef}
        value={title}
        onFocus={startEditing}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <Button onClick={() => deselectMovie()}>
        <TrashIcon />
      </Button>
    </div>
  );
};
