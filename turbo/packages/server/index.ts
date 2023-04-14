import { ApolloServer } from '@apollo/server';

import schema from './schema';
export * from './generated';

const apolloServer = new ApolloServer({ schema });

export default apolloServer;
