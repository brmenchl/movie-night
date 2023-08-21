import { useMutation, useQuery } from '@apollo/client';
import { A, O } from '@mobily/ts-belt';
import { useCallback } from 'react';
import { createFriendMutation, getFriendsQuery } from './queries';

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
