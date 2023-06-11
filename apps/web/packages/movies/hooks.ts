import { useMutation, useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { TESTFRIEND, TESTNIGHT } from '@core/TESTNIGHT';
import { createInput } from '@core/apollo';

import {
  deselectMovieMutation,
  getMovieSelectionsQuery,
  pickWinnerMutation,
  selectMovieMutation,
  updateMovieSelectionMutation,
} from './queries';

export const useSelectMovie = (title: string) =>
  useMutation(selectMovieMutation, {
    variables: { input: { friendId: TESTFRIEND, nightId: TESTNIGHT, title } },
  });

export const useDeselectMovie = (friendId: string) =>
  useMutation(deselectMovieMutation, {
    variables: { input: { friendId, nightId: TESTNIGHT } },
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
        }),
      [mutate]
    ),
    result,
  ] as const;
};

export const useGetMovieSelections = () => {
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
  const movieSelections = useGetMovieSelections();
  return useCallback(
    (index: number) => {
      const winningSelection = movieSelections[index];
      pickWinner({
        variables: {
          input: { nightId: TESTNIGHT, friendId: winningSelection.friendId },
        },
      });
    },
    [movieSelections, pickWinner]
  );
};
