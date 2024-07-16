import { useMutation, useQuery } from '@apollo/client';
import {
  createNightMutation,
  getNextNightQuery,
  getNightQuery,
  getNightsQuery,
} from './queries';
import { createInput } from '@/core/apollo';
import { useCallback } from 'react';
import { A, D, O, pipe } from '@mobily/ts-belt';
import { useNightId } from './nightIdUtils';
import { formatISO } from 'date-fns/formatISO';

export const useCreateNight = () => {
  const [mutate] = useMutation(createNightMutation);

  return useCallback(
    (data: { theme: string; date: Date; spinAgainCount: number }) =>
      mutate(
        createInput({
          theme: data.theme,
          date: formatISO(data.date),
          spinAgainCount: data.spinAgainCount,
        }),
      ),
    [mutate],
  );
};

export const useNights = () => {
  const { data } = useQuery(getNightsQuery);

  return pipe(
    data?.nights,
    O.fromNullable,
    O.mapWithDefault([], A.map(D.selectKeys(['id', 'date', 'theme']))),
  );
};

export const useNightById = (id: string) => {
  const { data } = useQuery(getNightQuery, createInput({ id }));

  return pipe(data?.night, O.fromNullable);
};

export const useNight = () => {
  const nightId = useNightId();
  return useNightById(nightId);
};

export const useNextNightId = () => {
  const { data, loading } = useQuery(getNextNightQuery);

  const nextNightId = pipe(data?.nextNight?.id, O.fromNullable);

  return loading
    ? ({ loading: true } as const)
    : ({ loading: false, nextNightId } as const);
};
