import { useMutation, useQuery } from '@apollo/client';
import { A, O } from '@mobily/ts-belt';
import { useCallback } from 'react';
import {
  createFriendMutation,
  getFriendQuery,
  getFriendsQuery,
} from './queries';
import { createInput } from '@core/apollo';

export const useFriend = (id: string) => {
  const { data } = useQuery(getFriendQuery, createInput({ id }));
  return O.fromNullable(data?.friend);
};

export const useFriends = () => {
  const { data } = useQuery(getFriendsQuery);
  return O.mapWithDefault(
    data?.friends,
    [],
    A.map(({ id, name }) => ({ id, name })),
  );
};

export const useCreateFriend = () => {
  const [createFriend] = useMutation(createFriendMutation);
  return useCallback(
    (name: string) => {
      createFriend({
        variables: { input: { name } },
        refetchQueries: [getFriendsQuery],
      });
    },
    [createFriend],
  );
};
