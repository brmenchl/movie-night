import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import WithInputPlugin from '@pothos/plugin-with-input';
import { type PrismaTypes, prismaClient } from 'database';

const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin, WithInputPlugin],
  prisma: {
    client: prismaClient,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

builder.queryType();
builder.mutationType();

export default builder;
