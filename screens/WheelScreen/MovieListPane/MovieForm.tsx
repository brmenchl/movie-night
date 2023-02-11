import MovieList from './MovieList';
import { useAddMovie } from './hooks';
import PlusIcon from '@rsuite/icons/Plus';
import React, { useCallback, useState } from 'react';
import Button from 'rsuite/Button';
import Form from 'rsuite/Form';
import Panel from 'rsuite/Panel';

const MovieForm: React.FC = () => {
  const addMovie = useAddMovie();
  const [movie, setMovie] = useState('');
  const onInputChange = useCallback((v: string) => setMovie(v), [setMovie]);
  const addMovieFromInput = useCallback(
    (_: boolean, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (movie.trim() !== '') {
        addMovie(movie.trim());
        setMovie('');
      }
    },
    [movie, addMovie, setMovie]
  );

  return (
    <Panel header="Movies" bordered>
      <Form layout="inline" onSubmit={addMovieFromInput}>
        <Form.Control
          name="title"
          placeholder="Add a movie!"
          value={movie}
          onChange={onInputChange}
        />
        <Button type="submit">
          <PlusIcon />
        </Button>
      </Form>
      <MovieList />
    </Panel>
  );
};

export default MovieForm;
