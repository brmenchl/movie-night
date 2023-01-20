import FlexboxGrid from "rsuite/FlexboxGrid";
import { Layout } from "@components/Layout";
import WheelPane from "@movies/WheelPane";
import MovieForm from "@movies/MovieListPane";

const Home: React.FC = () => (
  <Layout>
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={16}>
        <div style={{ width: 200, height: 200, margin: "auto" }}>
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
