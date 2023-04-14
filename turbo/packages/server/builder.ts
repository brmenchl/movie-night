import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import WithInputPlugin from '@pothos/plugin-with-input';

import prisma from '../database/prisma/client';
import PrismaTypes from '../database/prisma/pothos-types';

const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin, WithInputPlugin],
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

export default builder;
