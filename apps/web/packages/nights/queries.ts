import { graphql } from '../../gql';

export const createNightMutation = graphql(`
  mutation CreateNight($input: MutationCreateNightInput!) {
    createNight(input: $input) {
      id
      date
      theme
    }
  }
`);

export const getNightsQuery = graphql(`
  query GetNights {
    nights {
      id
      date
      theme
    }
  }
`);

export const getNightQuery = graphql(`
  query GetNight($input: QueryNightInput!) {
    night(input: $input) {
      id
      date
      theme
      spinAgainCount
    }
  }
`);

export const getNextNightQuery = graphql(`
  query GetNextNight {
    nextNight {
      id
      date
      theme
    }
  }
`);
