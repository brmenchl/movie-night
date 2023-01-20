import Stack from "rsuite/Stack";
import Button from "rsuite/Button";
import TrashIcon from "@rsuite/icons/Trash";
import { useAppSelector } from "../core/redux/hooks";
import { useRemoveMovie } from "./hooks";
import { makeSelectMovieById } from "../core/movies/movieSlice";
import { useMemo } from "react";

const MovieListItem: React.FC<{ id: string }> = (props) => {
  const selectMovieById = useMemo(makeSelectMovieById, []);
  const movie = useAppSelector((state) => selectMovieById(state, props.id));
  const removeMovie = useRemoveMovie(props.id);

  return movie ? (
    <Stack>
      <Stack.Item flex={1}>
        <p>{movie.title}</p>
      </Stack.Item>
      <Button color="red" appearance="primary" onClick={removeMovie}>
        <TrashIcon />
      </Button>
    </Stack>
  ) : null;
};

export default MovieListItem;
