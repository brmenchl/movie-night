import { O } from "@mobily/ts-belt";
import { selectWinnerMovie } from "@movies/movieSlice";
import { useAppSelector } from "@redux/hooks";

export const WinnerView: React.FC = () => {
  const winnerMovie = useAppSelector(selectWinnerMovie);
  return O.match(
    winnerMovie,
    (movie) => <h1>{movie.title}</h1>,
    () => null
  );
};
