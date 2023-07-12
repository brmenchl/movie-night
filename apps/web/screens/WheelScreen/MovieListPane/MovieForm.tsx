import XIcon from '@rsuite/icons/Close';
import PlusIcon from '@rsuite/icons/Plus';
import { useCallback, useRef, useState } from 'react';
import Button from 'rsuite/Button';
import Form, { FormInstance } from 'rsuite/Form';
import Panel from 'rsuite/Panel';
import Schema from 'rsuite/Schema';

import { useSelectMovie } from '@packages/movies';

import { FriendDropdown } from './FriendDropdown';
import { MovieList } from './MovieList';

const movieRule = Schema.Types.StringType().isRequired("C'mon, add a movie");

export const MovieForm = () => {
  const formRef = useRef<FormInstance>(null);
  const [title, setMovie] = useState('');
  const [friendId, setFriendId] = useState('');
  const clearMovieInput = useCallback(() => setMovie(''), [setMovie]);
  const clearFriendInput = useCallback(() => setFriendId(''), [setFriendId]);
  const [selectMovie] = useSelectMovie({ friendId, title });

  const addMovieSelectionFromInput = useCallback(() => {
    if (formRef.current && formRef.current.check()) {
      selectMovie();
      clearMovieInput();
      clearFriendInput();
    }
  }, [clearFriendInput, clearMovieInput, selectMovie]);

  return (
    <Panel header="Movies" bordered>
      <Form ref={formRef} layout="inline" onSubmit={addMovieSelectionFromInput}>
        <Form.Group>
          <Form.Control
            name="title"
            rule={movieRule}
            value={title}
            onChange={setMovie}
            placeholder="Add a movie!"
          />
          <Button onClick={clearMovieInput}>
            <XIcon />
          </Button>
          <FriendDropdown friendId={friendId} onChange={setFriendId} />
        </Form.Group>
        <Button type="submit">
          <PlusIcon />
        </Button>
      </Form>
      <MovieList />
    </Panel>
  );
};
