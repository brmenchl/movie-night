import List from "rsuite/List";
import { useMovieIds } from "../hooks/movies";
import MovieListItem from "./MovieListItem";

const MovieList: React.FC = () => {
  const movieIds = useMovieIds();
  return (
    <List size="md">
      {movieIds.map((movieId, index) => (
        <List.Item key={movieId} index={index} style={{ color: "black" }}>
          <MovieListItem id={movieId} />
        </List.Item>
      ))}
    </List>
  );
};

export default MovieList;