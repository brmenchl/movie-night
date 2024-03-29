import { ApolloServer } from '@apollo/server';

import schema from './schema';

const apolloServer = new ApolloServer({ schema });

export { schema };
export default apolloServer;
