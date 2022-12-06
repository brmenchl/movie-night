import React, {
  Reducer,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { guid } from "rsuite/utils";
import { Movie } from "../models/Movie";
import { Actions, createActionWithPayload } from "../utils/Actions";

enum MovieActionType {
  Add = "movie/add",
  Remove = "move/remove",
}

const MovieActions = {
  add: createActionWithPayload<MovieActionType.Add, Movie>(MovieActionType.Add),
  remove: createActionWithPayload<MovieActionType.Remove, string>(
    MovieActionType.Remove
  ),
} as const;

const movieReducer: Reducer<Movie[], Actions<typeof MovieActions>> = (
  state,
  action
) => {
  switch (action.type) {
    case MovieActionType.Add:
      return [...state, action.payload];
    case MovieActionType.Remove:
      return state.filter((movie) => movie.id !== action.payload);
    default:
      return state;
  }
};

const useMovieReducer = () => {
  const [state, dispatch] = useReducer(movieReducer, []);
  return useMemo(() => ({ state, dispatch }), [state, dispatch]);
};

export const MovieContext = React.createContext<
  ReturnType<typeof useMovieReducer>
>({
  state: [],
  dispatch: (_) => {},
});

export const MovieProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(movieReducer, []);
  const stateAndDispatch = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );
  return (
    <MovieContext.Provider value={stateAndDispatch}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieIds = () => {
  const { state } = useContext(MovieContext);
  return state.map((m) => m.id);
};

export const useMovieById = (id: string) => {
  const { state } = useContext(MovieContext);
  return state.find((m) => m.id === id);
};

export const useRemoveMovieById = (id: string) => {
  const { dispatch } = useContext(MovieContext);
  return useCallback(() => dispatch(MovieActions.remove(id)), [dispatch, id]);
};

export const useAddMovie = () => {
  const { dispatch } = useContext(MovieContext);
  return useCallback(
    (title: string) => {
      dispatch(MovieActions.add({ id: guid(), title }));
    },
    [dispatch]
  );
};
