import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const matrix = await prisma.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Matrix',
    },
  });
  const incredibles = await prisma.movie.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'The Incredibles',
    },
  });
  console.log({ matrix, bob: incredibles });
  await prisma.$disconnect();
};

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
