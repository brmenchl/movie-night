import { SelectionDialog, SelectionDialogTrigger } from './SelectionDialog';
import { Dialog } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';
import { WheelView } from './WheelView';
import { useNightId } from '@/packages/nights';
import { useWinner } from '@/packages/movies';
import { O } from '@mobily/ts-belt';
import { WinnerView } from './WinnerView';

export const NightDetail = () => {
  const nightId = useNightId();
  const winner = useWinner(nightId);

  return (
    <Layout>
      <Dialog>
        <div className="self-end">
          <SelectionDialogTrigger />
        </div>
        <div className="flex-1 self-stretch flex items-center justify-center">
          <WheelView nightId={nightId} />
        </div>
        <SelectionDialog />
      </Dialog>
      <Dialog defaultOpen>
        {O.map(winner, (w) => (
          <WinnerView {...w} />
        ))}
      </Dialog>
    </Layout>
  );
};
