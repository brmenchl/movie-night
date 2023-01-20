import FlexboxGrid from "rsuite/FlexboxGrid";
import MovieForm from "../components/MovieForm";
import Wheel from "../components/Wheel";
import { Layout } from "../components/Layout";

const Home: React.FC = () => (
  <Layout>
    <FlexboxGrid justify="space-around">
      <FlexboxGrid.Item colspan={16}>
        <div style={{ width: 200, height: 200, margin: "auto" }}>
          <Wheel />
        </div>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={7}>
        <MovieForm />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  </Layout>
);

export default Home;
