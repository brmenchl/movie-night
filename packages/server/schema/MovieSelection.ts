import { prismaClient } from 'database';

import builder from '../builder';

export const MovieSelection = builder.prismaObject('MovieSelection', {
  fields: (t) => ({
    movie: t.relation('movie'),
    friend: t.relation('friend'),
    night: t.relation('night'),
  }),
});

builder.queryFields((t) => ({
  movieSelection: t.prismaFieldWithInput({
    type: MovieSelection,
    input: {
      nightId: t.input.string({ required: true }),
      friendId: t.input.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _, { input: { friendId, nightId } }) =>
      prismaClient.movieSelection.findUnique({
        ...query,
        where: {
          friendId_nightId: {
            friendId,
            nightId,
          },
        },
      }),
  }),
  movieSelections: t.prismaFieldWithInput({
    type: [MovieSelection],
    input: {
      nightId: t.input.string({ required: true }),
    },
    resolve: (query, _, { input: { nightId } }) =>
      prismaClient.movieSelection.findMany({
        ...query,
        where: { nightId },
      }),
  }),
}));

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
    },
    resolve: (mutation, _, { input: { title, friendId, nightId } }) =>
      prismaClient.movieSelection.update({
        ...mutation,
        where: {
          friendId_nightId: {
            friendId,
            nightId,
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
