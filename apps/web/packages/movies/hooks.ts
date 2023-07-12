import { useMutation, useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { TESTNIGHT } from '@core/TESTNIGHT';
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

export const useSelectMovie = (selection: {
  friendId: string;
  title: string;
}) =>
  useMutation(selectMovieMutation, {
    variables: { input: { ...selection, nightId: TESTNIGHT } },
    refetchQueries: [getMovieSelectionsQuery],
  });

export const useDeselectMovie = (friendId: string) =>
  useMutation(deselectMovieMutation, {
    variables: { input: { friendId, nightId: TESTNIGHT } },
    refetchQueries: [getMovieSelectionsQuery],
  });

export const useUpdateMovieSelection = () => {
  const [mutate, result] = useMutation(updateMovieSelectionMutation);
  return [
    useCallback(
      (input: { friendId: string; title: string }) =>
        mutate({
          variables: {
            input: { ...input, nightId: TESTNIGHT },
          },
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

export const useMovieSelections = () => {
  const { data } = useQuery(
    getMovieSelectionsQuery,
    createInput({ nightId: TESTNIGHT }),
  );
  return O.mapWithDefault(
    data?.movieSelections,
    [],
    A.map(({ friend, movie }) => ({
      friendId: friend.id,
      title: movie.title,
    })),
  );
};

export const usePickWinnerByIndex = () => {
  const [pickWinner] = useMutation(pickWinnerMutation);
  const movieSelections = useMovieSelections();
  return useCallback(
    (index: number) => {
      const winningSelection = movieSelections[index];
      pickWinner({
        variables: {
          input: { nightId: TESTNIGHT, friendId: winningSelection.friendId },
        },
        refetchQueries: [getWinnerQuery],
      });
    },
    [movieSelections, pickWinner],
  );
};

export const useWinner = () => {
  const { data } = useQuery(getWinnerQuery, {
    variables: { input: { id: TESTNIGHT } },
  });
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
