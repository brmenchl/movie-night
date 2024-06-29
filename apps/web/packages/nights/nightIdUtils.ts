import { O, pipe } from '@mobily/ts-belt';
import { type NextRouter, useRouter } from 'next/router';

const parseNightIdFromRouter = ({ query: { id } }: NextRouter) => {
  if (Array.isArray(id)) return id[0];
  return id;
};

export const useNightId = () => {
  const router = useRouter();
  return pipe(
    router,
    parseNightIdFromRouter,
    O.fromNullable,
    O.getWithDefault('' as string),
  );
};
