import { useMutation, useQuery } from '@apollo/client';
import { A, O, pipe } from '@mobily/ts-belt';
import { useCallback } from 'react';

import { createInput } from '@/core/apollo';

import {
  deselectMovieMutation,
  getMovieSelectionsQuery,
  getWinnerQuery,
  pickWinnerMutation,
  selectMovieMutation,
  updateMovieSelectionMutation,
} from './queries';
import moize from 'moize';
import type { GetMovieSelectionsQuery } from '@/gql/graphql';

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

export const useMovieSelections = (nightId: string) => {
  const { data } = useQuery(getMovieSelectionsQuery, createInput({ nightId }));
  return lensSelections(data);
};

const lensSelections = moize((query?: GetMovieSelectionsQuery) =>
  O.mapWithDefault(
    query?.movieSelections,
    [],
    A.map(({ friend, movie, night }) => ({
      nightId: night.id,
      friendId: friend.id,
      title: movie.title,
    })),
  ),
);

export const useWinner = (nightId: string) => {
  const { data } = useQuery(getWinnerQuery, createInput({ id: nightId }));
  return pipe(
    data?.night?.winningSelection,
    O.fromNullable,
    O.map((selection) => ({
      friend: selection.friend.name,
      title: selection.movie.title,
    })),
  );
};

export const usePickWinner = () => {
  const [pickWinner] = useMutation(pickWinnerMutation);

  return useCallback(
    (input: { nightId: string; friendId: string }) => {
      pickWinner({
        ...createInput(input),
        refetchQueries: [getWinnerQuery],
      });
    },
    [pickWinner],
  );
};
