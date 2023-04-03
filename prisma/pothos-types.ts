/* eslint-disable */
import type { Movie, Prisma } from '@prisma/client';

export default interface PrismaTypes {
  Movie: {
    Name: 'Movie';
    Shape: Movie;
    Include: never;
    Select: Prisma.MovieSelect;
    OrderBy: Prisma.MovieOrderByWithRelationInput;
    WhereUnique: Prisma.MovieWhereUniqueInput;
    Where: Prisma.MovieWhereInput;
    Create: {};
    Update: {};
    RelationName: never;
    ListRelations: never;
    Relations: {};
  };
}
