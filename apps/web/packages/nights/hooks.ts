import { useMutation } from '@apollo/client';
import { createNightMutation } from './queries';
import { createInput } from '@core/apollo';
import { formatISO } from 'date-fns';
import { useCallback } from 'react';

export const useCreateNight = () => {
  const [mutate] = useMutation(createNightMutation);

  return useCallback(
    (data: { theme: string; date: Date }) =>
      mutate(createInput({ theme: data.theme, date: formatISO(data.date) })),
    [mutate],
  );
};
