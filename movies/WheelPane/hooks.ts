import { selectMovies } from "@movies/movieSlice";
import { useAppSelector } from "@redux/hooks";

export const useGetMovieWheelOptions = () =>
  useAppSelector(selectMovies).map((movie) => ({
    id: movie.id,
    displayName: movie.title,
  }));
