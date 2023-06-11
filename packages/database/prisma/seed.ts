import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const matrix = await prisma.movie.upsert({
    where: { title: 'Matrix' },
    update: {},
    create: {
      title: 'Matrix',
    },
  });

  const incredibles = await prisma.movie.upsert({
    where: { title: 'The Incredibles' },
    update: {},
    create: {
      title: 'The Incredibles',
    },
  });

  const brad = await prisma.friend.upsert({
    where: { name: 'Brad' },
    update: {},
    create: {
      name: 'Brad',
    },
  });

  const ben = await prisma.friend.upsert({
    where: { name: 'Ben' },
    update: {},
    create: {
      name: 'Ben',
    },
  });

  const night = await prisma.night.upsert({
    where: { date: new Date(2023, 4, 24).toISOString() },
    update: {},
    create: {
      date: new Date(2023, 4, 24).toISOString(),
      theme: 'BIG',
    },
  });

  await prisma.movieSelection.upsert({
    where: {
      friendId_nightId: {
        friendId: brad.id,
        nightId: night.id,
      },
    },
    update: {},
    create: {
      movie: { connect: { id: matrix.id } },
      friend: { connect: { id: brad.id } },
      night: { connect: { id: night.id } },
    },
  });

  await prisma.movieSelection.upsert({
    where: {
      friendId_nightId: {
        friendId: ben.id,
        nightId: night.id,
      },
    },
    update: {},
    create: {
      movie: { connect: { id: incredibles.id } },
      friend: { connect: { id: ben.id } },
      night: { connect: { id: night.id } },
    },
  });

  await prisma.$disconnect();
};

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
