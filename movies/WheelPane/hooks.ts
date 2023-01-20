import { selectMovieIds } from "@movies/movieSlice";
import { useAppSelector } from "@redux/hooks";

export const useGetMovieWheelOptions = () =>
  useAppSelector(selectMovieIds).map((id) => ({
    id,
    displayName: id,
  }));
