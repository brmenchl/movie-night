import { useQuery } from '@apollo/client';
import { Layout } from '@components/Layout';

import { graphql } from '../gql';

const movieListQuery = graphql(/* GraphQL */ `
  query Movies {
    movies {
      id
      title
    }
  }
`);

const Testing = () => {
  const { data } = useQuery(movieListQuery);
  return (
    <Layout>
      {(data?.movies ?? []).map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </Layout>
  );
};
export default Testing;
