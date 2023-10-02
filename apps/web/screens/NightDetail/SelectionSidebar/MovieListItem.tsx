import { useCallback } from 'react';

import { useDeselectMovie } from '@packages/movies';

import { useMovieEditing } from './useMovieEditing';
import { Button } from '@components/Button';
import { Icon } from '@components/Icon';
import classNames from 'classnames';
import { useFriend } from '@packages/friends';

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
    <div className="flex rounded-md">
      <div className="flex flex-col rounded-l-md border-2 border-gray-200 dark:bg-slate-900 dark:border-gray-700">
        <input
          type="text"
          ref={inputRef}
          value={title}
          onFocus={startEditing}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={handleKeyPress}
          className={classNames(
            'py-3 px-4 block w-full rounded-tl-md text-sm focus:z-10 border-0 focus:border-blue-500 focus:ring-blue-500 dark:text-gray-400',
          )}
        />
        <div className="border-t-2 border-slate-400 px-2">
          <p className="text-gray-400">{friend?.name}</p>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center w-2 rounded-r-md border-transparent bg-blue-500 text-white hover:bg-blue-600 focus:z-10 transition-all text-sm">
        <Button.Wrapper
          className="flex-1 p-2"
          onClick={handleDeselectMovieClick}
        >
          <Icon.Trash />
        </Button.Wrapper>
      </div>
    </div>
  );
};
