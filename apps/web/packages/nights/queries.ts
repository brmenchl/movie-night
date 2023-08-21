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

export const getNightsQuery = graphql(`
  query GetNights {
    nights {
      date
      id
      theme
    }
  }
`);
