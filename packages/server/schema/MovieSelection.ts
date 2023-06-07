import { prismaClient } from 'database';

import builder from '../builder';

export const MovieSelection = builder.prismaObject('MovieSelection', {
  fields: (t) => ({
    movie: t.relation('movie'),
    friend: t.relation('friend'),
    night: t.relation('night'),
  }),
});

builder.mutationFields((t) => ({
  selectMovie: t.prismaFieldWithInput({
    type: MovieSelection,
    input: {
      title: t.input.string({ required: true }),
      friendId: t.input.string({ required: true }),
      nightId: t.input.string({ required: true }),
    },
    resolve: (mutation, _, { input: { title, friendId, nightId } }) =>
      prismaClient.movieSelection.create({
        ...mutation,
        data: {
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
  updateMovieSelection: t.prismaFieldWithInput({
    type: MovieSelection,
    input: {
      title: t.input.string({ required: true }),
      friendId: t.input.string({ required: true }),
      nightId: t.input.string({ required: true }),
      previousMovieId: t.input.string({ required: true }),
    },
    resolve: (
      mutation,
      _,
      { input: { title, friendId, nightId, previousMovieId } }
    ) =>
      prismaClient.movieSelection.update({
        ...mutation,
        where: {
          movieId_friendId_nightId: {
            friendId,
            nightId,
            movieId: previousMovieId,
          },
        },
        data: {
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
