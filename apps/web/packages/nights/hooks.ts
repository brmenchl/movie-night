import { useMutation, useQuery } from '@apollo/client';
import { createNightMutation, getNightsQuery } from './queries';
import { createInput } from '@core/apollo';
import { formatISO } from 'date-fns';
import { useCallback } from 'react';
import { A, D, O, pipe } from '@mobily/ts-belt';

export const useCreateNight = () => {
  const [mutate] = useMutation(createNightMutation);

  return useCallback(
    (data: { theme: string; date: Date }) =>
      mutate(createInput({ theme: data.theme, date: formatISO(data.date) })),
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
