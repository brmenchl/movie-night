import { NightIdGuard } from '@packages/nights';
import { MovieForm } from './MovieListPane';
import { WheelPane } from './WheelPane';

export const NightDetail = () => (
  <NightIdGuard>
    <div className="justify-around">
      <div className="flex-1" />
      <div className="flex-1">
        <WheelPane />
      </div>
      <div className="flex-2">
        <MovieForm />
      </div>
    </div>
  </NightIdGuard>
);
