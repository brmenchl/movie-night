import { prismaClient } from 'database';

import builder from '../builder';

export const Friend = builder.prismaObject('Friend', {
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name'),
    selections: t.relation('movieSelections'),
  }),
});

builder.queryFields((t) => ({
  friend: t.prismaFieldWithInput({
    type: Friend,
    input: {
      name: t.input.string({ required: true }),
    },
    nullable: true,
    resolve: async (query, _, { input: { name } }) =>
      prismaClient.friend.findUnique({
        ...query,
        where: { name },
      }),
  }),
  friends: t.prismaField({
    type: [Friend],
    nullable: true,
    resolve: prismaClient.friend.findMany,
  }),
}));

builder.mutationFields((t) => ({
  createFriend: t.prismaFieldWithInput({
    type: Friend,
    input: {
      name: t.input.string({ required: true }),
    },
    resolve: async (mutation, _, { input: { name } }) =>
      prismaClient.friend.create({
        ...mutation,
        data: { name },
      }),
  }),
}));
