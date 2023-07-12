import { makeVar, useReactiveVar } from '@apollo/client';
import { O, Option } from '@mobily/ts-belt';
import { NextRouter, useRouter } from 'next/router';

const nightIdVar = makeVar<Option<string>>(O.None);

export const useNightId = () =>
  O.getWithDefault(useReactiveVar(nightIdVar), '');

export const NightIdGuard = (props: { children: React.ReactNode }) => {
  const nightId = parseNightIdFromRouter(useRouter());
  nightIdVar(nightId);
  return nightIdVar() ? props.children : null;
};

const parseNightIdFromRouter = ({ query: { id } }: NextRouter) => {
  if (Array.isArray(id)) return id[0];
  return id;
};
