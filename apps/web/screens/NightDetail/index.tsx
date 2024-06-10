import { NightIdGuard } from '@/packages/nights';
import { WheelPane } from './WheelPane';
import { SelectionDialog } from './SelectionDialog';
import { Dialog } from '@/components/ui/dialog';

export const NightDetail = () => (
  <NightIdGuard>
    <Dialog>
      <WheelPane />
      <SelectionDialog />
    </Dialog>
  </NightIdGuard>
);
