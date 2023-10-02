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
      id: t.input.string({ required: true }),
    },
    nullable: true,
    resolve: (query, _, { input: { id } }) =>
      prismaClient.friend.findUnique({
        ...query,
        where: { id },
      }),
  }),
  friends: t.prismaField({
    type: [Friend],
    nullable: true,
    resolve: () => prismaClient.friend.findMany(),
  }),
}));

builder.mutationFields((t) => ({
  createFriend: t.prismaFieldWithInput({
    type: Friend,
    input: {
      name: t.input.string({ required: true }),
    },
    resolve: (mutation, _, { input: { name } }) =>
      prismaClient.friend.create({
        ...mutation,
        data: { name },
      }),
  }),
}));
