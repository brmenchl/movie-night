import { apolloClient } from '@core/apollo';
import { getNextNightQuery } from './queries';
import { O } from '@mobily/ts-belt';

export const getNextNightId = async () => {
  const { data } = await apolloClient.query({
    query: getNextNightQuery,
  });
  return O.fromNullable(data.nextNight?.id);
};
