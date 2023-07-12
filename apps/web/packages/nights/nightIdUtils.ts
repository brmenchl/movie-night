import { O, pipe } from '@mobily/ts-belt';
import { NextRouter, useRouter } from 'next/router';

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

export const NightIdGuard = (props: { children: React.ReactNode }) =>
  useNightId() ? props.children : null;
