import { graphql } from '../../gql';

export const getFriendQuery = graphql(`
  query GetFriend($input: QueryFriendInput!) {
    friend(input: $input) {
      id
      name
    }
  }
`);

export const getFriendsQuery = graphql(`
  query GetFriends {
    friends {
      id
      name
    }
  }
`);

export const createFriendMutation = graphql(`
  mutation CreateFriend($input: MutationCreateFriendInput!) {
    createFriend(input: $input) {
      id
      name
    }
  }
`);
