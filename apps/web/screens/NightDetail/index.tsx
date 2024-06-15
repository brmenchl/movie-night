import { NightIdGuard } from '@/packages/nights';
import { WheelPane } from './WheelPane';
import { SelectionDialog } from './SelectionDialog';
import { Dialog } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';

export const NightDetail = () => (
  <NightIdGuard>
    <Layout>
      <Dialog>
        <WheelPane />
        <SelectionDialog />
      </Dialog>
    </Layout>
  </NightIdGuard>
);
