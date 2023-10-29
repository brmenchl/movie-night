import { NightIdGuard } from '@packages/nights';
import { WheelPane } from './WheelPane';
import { SelectionSidebar } from './SelectionSidebar';

export const NightDetail = () => (
  <NightIdGuard>
    <div id="container" className="justify-around">
      <div className="flex-1" />
      <div className="flex-1">
        <WheelPane />
      </div>
      <SelectionSidebar />
    </div>
  </NightIdGuard>
);
