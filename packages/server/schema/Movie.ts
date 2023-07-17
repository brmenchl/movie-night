import { prismaClient } from 'database';

import builder from '../builder';

export const Movie = builder.prismaObject('Movie', {
  fields: (t) => ({
    id: t.exposeString('id'),
    title: t.exposeString('title'),
  }),
});

builder.queryFields((t) => ({
  movie: t.prismaFieldWithInput({
    type: Movie,
    input: {
      title: t.input.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _, { input: { title } }) =>
      prismaClient.movie.findUnique({
        ...query,
        where: {
          title,
        },
      }),
  }),
  movies: t.prismaField({
    type: [Movie],
    nullable: true,
    resolve: () => prismaClient.movie.findMany(),
  }),
}));
