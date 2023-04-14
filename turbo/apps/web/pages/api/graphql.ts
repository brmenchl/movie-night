import { startServerAndCreateNextHandler } from '@as-integrations/next';
import apolloServer from '../../../../packages/server';

export default startServerAndCreateNextHandler(apolloServer);
