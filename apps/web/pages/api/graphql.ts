import { startServerAndCreateNextHandler } from '@as-integrations/next';
import apolloServer from 'server';

export default startServerAndCreateNextHandler(apolloServer);
