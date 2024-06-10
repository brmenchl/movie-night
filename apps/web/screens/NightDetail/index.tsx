import { NightIdGuard } from '@/packages/nights';
import { WheelPane } from './WheelPane';
import { SelectionSidebar } from './SelectionSidebar';

export const NightDetail = () => (
  <NightIdGuard>
    <WheelPane />
    <SelectionSidebar />
  </NightIdGuard>
);
