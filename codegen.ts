import type { CodegenConfig } from '@graphql-codegen/cli';
import { lexicographicSortSchema, printSchema } from 'graphql';

import schema from './server/schema';

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(lexicographicSortSchema(schema)),
  documents: ['screens/**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'generated/': {
      preset: 'client',
    },
  },
};

export default config;
