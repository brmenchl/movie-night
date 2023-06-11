import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useUpdateMovieSelection } from '@packages/movies';

export const useMovieEditing = ({
  friendId,
  title: savedTitle,
}: {
  friendId: string;
  title: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(savedTitle);

  const [updateMovieSelection] = useUpdateMovieSelection();

  const save = useCallback(() => {
    inputRef.current?.blur();
    updateMovieSelection({ friendId, title });
  }, [friendId, title, updateMovieSelection]);

  const cancel = useCallback(() => {
    inputRef.current?.blur();
    setTitle(savedTitle);
  }, [savedTitle]);

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
    } else {
      document.removeEventListener('keydown', escFunction, true);
    }
    return () => document.removeEventListener('keydown', escFunction, true);
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
