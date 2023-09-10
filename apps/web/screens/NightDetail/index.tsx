import FlexboxGrid from 'rsuite/FlexboxGrid';

import { Layout } from '@components/Layout';
import { NightIdGuard } from '@packages/nights';
import { MovieForm } from './MovieListPane';
import { WheelPane } from './WheelPane';

export const NightDetail = () => (
  <NightIdGuard>
    <Layout>
      <FlexboxGrid justify="space-around">
        <FlexboxGrid.Item colspan={8} />
        <FlexboxGrid.Item colspan={8}>
          <WheelPane />
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <MovieForm />
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Layout>
  </NightIdGuard>
);
