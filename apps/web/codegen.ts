import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';
import { schema } from 'server';

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(lexicographicSortSchema(schema)),
  documents: ['**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'gql/': {
      preset: 'client',
    },
  },
};

export default config;
