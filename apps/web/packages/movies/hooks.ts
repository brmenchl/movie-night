import { useMutation, useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { createInput } from '@core/apollo';

import {
  createFriendMutation,
  deselectMovieMutation,
  getFriendsQuery,
  getMovieSelectionsQuery,
  getWinnerQuery,
  pickWinnerMutation,
  selectMovieMutation,
  updateMovieSelectionMutation,
} from './queries';

export const useSelectMovie = (nightId: string) => {
  const [mutate] = useMutation(selectMovieMutation, {
    refetchQueries: [getMovieSelectionsQuery],
  });
  return useCallback(
    (selection: { friendId: string; title: string }) =>
      mutate(createInput({ ...selection, nightId })),
    [mutate, nightId],
  );
};

export const useDeselectMovie = (nightId: string, friendId: string) => {
  const [mutate] = useMutation(deselectMovieMutation, {
    ...createInput({ nightId, friendId }),
    refetchQueries: [getMovieSelectionsQuery],
  });
  return mutate;
};

export const useUpdateMovieSelection = () => {
  const [mutate, result] = useMutation(updateMovieSelectionMutation);
  return [
    useCallback(
      (input: { nightId: string; friendId: string; title: string }) =>
        mutate({
          ...createInput(input),
          refetchQueries: [getMovieSelectionsQuery],
        }),
      [mutate],
    ),
    result,
  ] as const;
};

export const useFriends = () => {
  const { data } = useQuery(getFriendsQuery);
  return O.mapWithDefault(
    data?.friends,
    [],
    A.map(({ id, name }) => ({ id, name })),
  );
};

export const useCreateFriend = () => {
  const [createFriend] = useMutation(createFriendMutation);
  return useCallback(
    (name: string) => {
      createFriend({
        variables: { input: { name } },
        refetchQueries: [getFriendsQuery],
      });
    },
    [createFriend],
  );
};

export const useMovieSelections = (nightId: string) => {
  const { data } = useQuery(getMovieSelectionsQuery, createInput({ nightId }));
  return O.mapWithDefault(
    data?.movieSelections,
    [],
    A.map(({ friend, movie, night }) => ({
      nightId: night.id,
      friendId: friend.id,
      title: movie.title,
    })),
  );
};

export const usePickWinnerByIndex = (nightId: string) => {
  const [pickWinner] = useMutation(pickWinnerMutation);
  const movieSelections = useMovieSelections(nightId);
  return useCallback(
    (index: number) => {
      const winningSelection = movieSelections[index];
      pickWinner({
        ...createInput({ nightId, friendId: winningSelection.friendId }),
        refetchQueries: [getWinnerQuery],
      });
    },
    [movieSelections, nightId, pickWinner],
  );
};

export const useWinner = (nightId: string) => {
  const { data } = useQuery(getWinnerQuery, createInput({ id: nightId }));
  return pipe(
    data?.night?.winningSelection,
    O.fromNullable,
    O.map((selection) => {
      console.log(selection);
      return {
        friendId: selection.friend.id,
        title: selection.movie.title,
      };
    }),
  );
};
