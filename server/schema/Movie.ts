import { G } from '@mobily/ts-belt';

import prisma from '../../prisma/client';
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
        prisma.movie.findUnique({
          ...query,
          where: {
            id: G.isString(id) ? Number.parseInt(id) : id,
          },
        }),
    }),
  }),
});
