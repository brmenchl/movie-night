import { graphql } from '../../gql';

// const wheelOrderVar = makeVar<readonly string[]>([]);

// export const shuffleMovieSelections = () =>
//   wheelOrderVar(A.shuffle(wheelOrderVar()));

export const selectMovieMutation = graphql(`
  mutation SelectMovie($input: MutationSelectMovieInput!) {
    selectMovie(input: $input) {
      friend {
        name
        id
      }
      movie {
        title
        id
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
          name
        }
        movie {
          title
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
      movie {
        title
        id
      }
    }
  }
`);

export const pickWinnerMutation = graphql(`
  mutation PickWinner($input: MutationPickWinnerInput!) {
    pickWinner(input: $input) {
      winningSelection {
        movie {
          id
          title
        }
        friend {
          name
          id
        }
      }
    }
  }
`);

export const getMovieIdsQuery = graphql(`
  query GetMovieIds {
    movies {
      id
    }
  }
`);

export const getMoviesQuery = graphql(`
  query GetMovies {
    movies {
      id
      title
    }
  }
`);

export const getMovieQuery = graphql(`
  query GetMovie($input: QueryMovieInput!) {
    movie(input: $input) {
      id
      title
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
          name
          id
        }
      }
    }
  }
`);
