import XIcon from '@rsuite/icons/Close';
import PlusIcon from '@rsuite/icons/Plus';
import { useCallback, useRef, useState } from 'react';
import { Schema } from 'rsuite';
import Button from 'rsuite/Button';
import Form, { FormInstance } from 'rsuite/Form';
import Panel from 'rsuite/Panel';

import { useSelectMovie } from '@packages/movies';

import { MovieList } from './MovieList';

const movieRule = Schema.Types.StringType().isRequired("C'mon, add a movie");

export const MovieForm = () => {
  const formRef = useRef<FormInstance>(null);
  const [title, setMovie] = useState('');
  const clearMovieInput = useCallback(() => setMovie(''), [setMovie]);
  const [selectMovie] = useSelectMovie(title);

  const addMovieSelectionFromInput = useCallback(() => {
    if (formRef.current && formRef.current.check()) {
      selectMovie();
      clearMovieInput();
    }
  }, [clearMovieInput, selectMovie]);

  return (
    <Panel header="Movies" bordered>
      <Form ref={formRef} layout="inline" onSubmit={addMovieSelectionFromInput}>
        <Form.Group>
          <Form.Control
            name="title"
            rule={movieRule}
            onChange={setMovie}
            value={title}
            placeholder="Add a movie!"
          />
          <Button onClick={clearMovieInput}>
            <XIcon />
          </Button>
        </Form.Group>
        <Button type="submit">
          <PlusIcon />
        </Button>
        {/* <Button onClick={shuffleMovies}>
          <ShuffleIcon />
        </Button> */}
      </Form>
      <MovieList />
    </Panel>
  );
};
