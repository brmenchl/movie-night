import { useMutation, useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { TESTFRIEND, TESTNIGHT } from '@core/TESTNIGHT';
import { createInput } from '@core/apollo';

import {
  deselectMovieMutation,
  getMovieSelectionsQuery,
  getWinnerQuery,
  pickWinnerMutation,
  selectMovieMutation,
  updateMovieSelectionMutation,
} from './queries';

export const useSelectMovie = (title: string) =>
  useMutation(selectMovieMutation, {
    variables: { input: { friendId: TESTFRIEND, nightId: TESTNIGHT, title } },
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
      [mutate]
    ),
    result,
  ] as const;
};

export const useMovieSelections = () => {
  const { data } = useQuery(
    getMovieSelectionsQuery,
    createInput({ nightId: TESTNIGHT })
  );
  return pipe(
    data?.movieSelections,
    O.fromNullable,
    O.mapWithDefault(
      [],
      A.map(({ friend, movie }) => ({
        friendId: friend.id,
        title: movie.title,
      }))
    )
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
    [movieSelections, pickWinner]
  );
};

export const useWinner = () => {
  const { data } = useQuery(getWinnerQuery, {
    variables: { input: { id: TESTNIGHT } },
  });
  return O.map(data?.night?.winningSelection, (selection) => ({
    friendId: selection.friend.id,
    title: selection.movie.title,
  }));
};
