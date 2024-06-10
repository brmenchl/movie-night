import { NightIdGuard } from '@/packages/nights';
import { WheelPane } from './WheelPane';
import { SelectionSidebar } from './SelectionSidebar';
import { Dialog } from '@/components/ui/dialog';

export const NightDetail = () => (
  <NightIdGuard>
    <Dialog>
      <WheelPane />
      <SelectionSidebar />
    </Dialog>
  </NightIdGuard>
);
