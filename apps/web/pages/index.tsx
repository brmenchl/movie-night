import { Layout } from '@components/Layout';
import FlexboxGrid from 'rsuite/FlexboxGrid';

import MovieForm from '../screens/WheelScreen/MovieListPane';
import WheelPane from '../screens/WheelScreen/WheelPane';

const Home = () => (
  <Layout>
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={16}>
        <div style={{ width: 200, height: 200, margin: 'auto' }}>
          <WheelPane />
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={7}>
        <MovieForm />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Layout>
);

export default Home;
