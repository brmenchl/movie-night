import MovieList from './MovieList';
import { useMovieMutations } from './hooks';
import XIcon from '@rsuite/icons/Close';
import PlusIcon from '@rsuite/icons/Plus';
import ShuffleIcon from '@rsuite/icons/Random';
import { useCallback, useRef } from 'react';
import React from 'react';
import { Schema } from 'rsuite';
import Button from 'rsuite/Button';
import Form, { FormInstance } from 'rsuite/Form';
import Panel from 'rsuite/Panel';

const MovieForm: React.FC = () => {
  const formRef = useRef<FormInstance>(null);
  const movieRule = Schema.Types.StringType().isRequired("C'mon, add a movie");
  const [movie, setMovie] = React.useState('');

  const { addMovie, shuffleMovies } = useMovieMutations();

  const clearMovieInput = useCallback(() => setMovie(''), [setMovie]);

  const addMovieFromInput = useCallback(() => {
    if (formRef.current && formRef.current.check()) {
      addMovie(movie);
      clearMovieInput();
    }
  }, [addMovie, clearMovieInput, movie]);

  return (
    <Panel header="Movies" bordered>
      <Form ref={formRef} layout="inline" onSubmit={addMovieFromInput}>
        <Form.Group>
          <Form.Control
            name="title"
            rule={movieRule}
            onChange={setMovie}
            value={movie}
            placeholder="Add a movie!"
          />
          <Button onClick={clearMovieInput}>
            <XIcon />
          </Button>
        </Form.Group>
        <Button type="submit">
          <PlusIcon />
        </Button>
        <Button onClick={shuffleMovies}>
          <ShuffleIcon />
        </Button>
      </Form>
      <MovieList />
    </Panel>
  );
};

export default MovieForm;
