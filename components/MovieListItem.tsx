import Stack from "rsuite/Stack";
import Button from "rsuite/Button";
import TrashIcon from "@rsuite/icons/Trash";
import { useMovieById, useRemoveMovieById } from "../hooks/movies";

const MovieListItem: React.FC<{ id: string }> = (props) => {
  const movie = useMovieById(props.id);
  const removeMovie = useRemoveMovieById(props.id);
  if (movie === undefined) return null;
  return (
    <Stack>
      <Stack.Item flex={1}>
        <p>{movie.title}</p>
      </Stack.Item>
      <Button color="red" appearance="primary" onClick={removeMovie}>
        <TrashIcon />
      </Button>
    </Stack>
  );
};

export default MovieListItem;