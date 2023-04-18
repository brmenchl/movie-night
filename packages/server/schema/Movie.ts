import { G } from '@mobily/ts-belt';
import { prismaClient } from 'database';

import builder from '../builder';

export const Movie = builder.prismaObject('Movie', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
  }),
});

builder.queryType({
  fields: (t) => ({
    movie: t.prismaFieldWithInput({
      type: Movie,
      input: {
        id: t.input.id({ required: true }),
      },
      nullable: true,
      resolve: async (query, _, { input: { id } }) =>
        prismaClient.movie.findUnique({
          ...query,
          where: {
            id: G.isString(id) ? Number.parseInt(id) : id,
          },
        }),
    }),
    movies: t.prismaField({
      type: [Movie],
      nullable: true,
      resolve: async (query) => prismaClient.movie.findMany(query),
    }),
  }),
});
