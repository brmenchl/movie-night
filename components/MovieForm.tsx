import React, { useCallback, useState } from "react";
import Panel from "rsuite/Panel";
import Button from "rsuite/Button";
import Form from "rsuite/Form";
import PlusIcon from "@rsuite/icons/Plus";
import { useAddMovie } from "./hooks";
import MovieList from "./MovieList";

const MovieForm: React.FC = () => {
  const addMovie = useAddMovie();
  const [movie, setMovie] = useState("");
  const onInputChange = useCallback((v: string) => setMovie(v), [setMovie]);
  const addMovieFromInput = useCallback(
    (_: Boolean, e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addMovie(movie);
      setMovie("");
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
