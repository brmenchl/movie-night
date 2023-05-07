import { prismaClient } from 'database';

import builder from '../builder';

export const MovieSelection = builder.prismaObject('MovieSelection', {
  fields: (t) => ({
    movie: t.relation('movie'),
    friend: t.relation('friend'),
    night: t.relation('night'),
    friendDisplayName: t.exposeString('friendDisplayName', { nullable: true }),
  }),
});

builder.mutationFields((t) => ({
  selectMovie: t.prismaFieldWithInput({
    type: MovieSelection,
    input: {
      title: t.input.string({ required: true }),
      friendId: t.input.string({ required: true }),
      nightId: t.input.string({ required: true }),
      friendDisplayName: t.input.string(),
    },
    resolve: (
      mutation,
      _,
      { input: { title, friendId, nightId, friendDisplayName } }
    ) =>
      prismaClient.movieSelection.create({
        ...mutation,
        data: {
          friendDisplayName,
          friend: {
            connect: {
              id: friendId,
            },
          },
          night: {
            connect: {
              id: nightId,
            },
          },
          movie: {
            connectOrCreate: {
              where: { title },
              create: { title },
            },
          },
        },
      }),
  }),
}));