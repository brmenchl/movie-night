import { graphql } from '../../gql';

export const selectMovieMutation = graphql(`
  mutation SelectMovie($input: MutationSelectMovieInput!) {
    selectMovie(input: $input) {
      friend {
        id
      }
      night {
        id
      }
      movie {
        id
        title
      }
    }
  }
`);

export const deselectMovieMutation = graphql(`
  mutation DeselectMovie($input: MutationDeselectMovieInput!) {
    deselectMovie(input: $input) {
      selections {
        friend {
          id
        }
        night {
          id
        }
        movie {
          id
        }
      }
    }
  }
`);

export const updateMovieSelectionMutation = graphql(`
  mutation UpdateMovieSelection($input: MutationUpdateMovieSelectionInput!) {
    updateMovieSelection(input: $input) {
      friend {
        id
      }
      night {
        id
      }
      movie {
        id
        title
      }
    }
  }
`);

export const pickWinnerMutation = graphql(`
  mutation PickWinner($input: MutationPickWinnerInput!) {
    pickWinner(input: $input) {
      winningSelection {
        friend {
          id
        }
        night {
          id
        }
        movie {
          id
          title
        }
      }
    }
  }
`);

export const clearWinnerMutation = graphql(`
  mutation ClearWinner($input: MutationClearWinnerInput!) {
    clearWinner(input: $input) {
      id
    }
  }
`);

export const getMovieSelectionsQuery = graphql(`
  query GetMovieSelections($input: QueryMovieSelectionsInput!) {
    movieSelections(input: $input) {
      night {
        id
      }
      friend {
        id
        name
      }
      movie {
        id
        title
      }
    }
  }
`);

export const getWinnerQuery = graphql(`
  query GetWinner($input: QueryNightInput!) {
    night(input: $input) {
      winningSelection {
        movie {
          id
          title
        }
        friend {
          id
          name
        }
      }
    }
  }
`);
