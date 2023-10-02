import { NightIdGuard } from '@packages/nights';
import { MovieForm } from './MovieListPane';
import { WheelPane } from './WheelPane';
import { Sidebar } from './MovieListPane/Sidebar';

export const NightDetail = () => (
  <NightIdGuard>
    <div className="justify-around">
      <div className="flex-1" />
      <div className="flex-1">
        <WheelPane />
      </div>
      <button type="button" data-hs-overlay="#hello">
        Open sidebar
      </button>
      <Sidebar id="hello">
        <MovieForm />
      </Sidebar>
    </div>
  </NightIdGuard>
);
