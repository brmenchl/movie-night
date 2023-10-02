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
      <button type="button" data-hs-overlay="#sidebar" aria-controls="sidebar">
        Open sidebar
      </button>
      <SelectionSidebar />
    </div>
  </NightIdGuard>
);
