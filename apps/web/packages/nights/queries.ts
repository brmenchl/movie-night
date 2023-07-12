import { graphql } from '../../gql';

export const createNightMutation = graphql(`
  mutation CreateNight($input: MutationCreateNightInput!) {
    createNight(input: $input) {
      date
      id
      theme
    }
  }
`);
