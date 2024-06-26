/* eslint-disable */
import type { Prisma, Movie, Friend, Night, MovieSelection } from "@prisma/client";
export default interface PrismaTypes {
    Movie: {
        Name: "Movie";
        Shape: Movie;
        Include: Prisma.MovieInclude;
        Select: Prisma.MovieSelect;
        OrderBy: Prisma.MovieOrderByWithRelationInput;
        WhereUnique: Prisma.MovieWhereUniqueInput;
        Where: Prisma.MovieWhereInput;
        Create: {};
        Update: {};
        RelationName: "movieSelections";
        ListRelations: "movieSelections";
        Relations: {
            movieSelections: {
                Shape: MovieSelection[];
                Name: "MovieSelection";
                Nullable: false;
            };
        };
    };
    Friend: {
        Name: "Friend";
        Shape: Friend;
        Include: Prisma.FriendInclude;
        Select: Prisma.FriendSelect;
        OrderBy: Prisma.FriendOrderByWithRelationInput;
        WhereUnique: Prisma.FriendWhereUniqueInput;
        Where: Prisma.FriendWhereInput;
        Create: {};
        Update: {};
        RelationName: "movieSelections";
        ListRelations: "movieSelections";
        Relations: {
            movieSelections: {
                Shape: MovieSelection[];
                Name: "MovieSelection";
                Nullable: false;
            };
        };
    };
    Night: {
        Name: "Night";
        Shape: Night;
        Include: Prisma.NightInclude;
        Select: Prisma.NightSelect;
        OrderBy: Prisma.NightOrderByWithRelationInput;
        WhereUnique: Prisma.NightWhereUniqueInput;
        Where: Prisma.NightWhereInput;
        Create: {};
        Update: {};
        RelationName: "movieSelections" | "winningSelection";
        ListRelations: "movieSelections";
        Relations: {
            movieSelections: {
                Shape: MovieSelection[];
                Name: "MovieSelection";
                Nullable: false;
            };
            winningSelection: {
                Shape: MovieSelection | null;
                Name: "MovieSelection";
                Nullable: true;
            };
        };
    };
    MovieSelection: {
        Name: "MovieSelection";
        Shape: MovieSelection;
        Include: Prisma.MovieSelectionInclude;
        Select: Prisma.MovieSelectionSelect;
        OrderBy: Prisma.MovieSelectionOrderByWithRelationInput;
        WhereUnique: Prisma.MovieSelectionWhereUniqueInput;
        Where: Prisma.MovieSelectionWhereInput;
        Create: {};
        Update: {};
        RelationName: "friend" | "movie" | "night" | "winningNight";
        ListRelations: never;
        Relations: {
            friend: {
                Shape: Friend;
                Name: "Friend";
                Nullable: false;
            };
            movie: {
                Shape: Movie;
                Name: "Movie";
                Nullable: false;
            };
            night: {
                Shape: Night;
                Name: "Night";
                Nullable: false;
            };
            winningNight: {
                Shape: Night | null;
                Name: "Night";
                Nullable: true;
            };
        };
    };
}