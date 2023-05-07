import { prismaClient } from 'database';

import builder from '../builder';

export const Night = builder.prismaObject('Night', {
  fields: (t) => ({
    id: t.exposeString('id'),
    theme: t.exposeString('theme'),
    date: t.exposeString('date'),
    selections: t.relation('movieSelections'),
    winningSelection: t.relation('winningSelection', { nullable: true }),
  }),
});

builder.queryFields((t) => ({
  night: t.prismaFieldWithInput({
    type: Night,
    input: {
      date: t.input.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _, { input: { date } }) =>
      prismaClient.night.findUnique({
        ...query,
        where: { date },
      }),
  }),
  nights: t.prismaField({
    type: [Night],
    nullable: true,
    resolve: prismaClient.night.findMany,
  }),
}));

builder.mutationFields((t) => ({
  createNight: t.prismaFieldWithInput({
    type: Night,
    input: {
      date: t.input.string({ required: true }),
      theme: t.input.string({ required: true }),
    },
    resolve: (mutation, _, { input: { date, theme } }) =>
      prismaClient.night.create({
        ...mutation,
        data: { date, theme },
      }),
  }),
  pickWinner: t.prismaFieldWithInput({
    type: Night,
    input: {
      movieId: t.input.string({ required: true }),
      friendId: t.input.string({ required: true }),
      nightId: t.input.string({ required: true }),
    },
    resolve: (mutation, _, { input: { movieId, friendId, nightId } }) =>
      prismaClient.night.update({
        ...mutation,
        where: { id: nightId },
        data: {
          winningSelection: {
            connect: {
              movieId_friendId_nightId: { movieId, friendId, nightId },
            },
          },
        },
      }),
  }),
}));