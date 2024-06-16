import { NightIdGuard, useNightId } from '@/packages/nights';
import { SelectionDialog, SelectionDialogTrigger } from './SelectionDialog';
import { Dialog } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';
import { usePickWinnerByIndex } from '@/packages/movies';
import { Wheel } from '@/packages/wheel';
import { useGetMovieWheelOptions } from './hooks';

export const NightDetail = () => {
  const movieSelections = useGetMovieWheelOptions();
  const nightId = useNightId();
  const pickWinnerByIndex = usePickWinnerByIndex(nightId);

  return (
    <NightIdGuard>
      <Layout>
        <Dialog>
          <div className="self-end">
            <SelectionDialogTrigger />
          </div>
          <div className="flex-1 self-stretch flex items-center justify-center">
            {movieSelections.length > 0 ? (
              <Wheel
                options={movieSelections}
                onSpinComplete={pickWinnerByIndex}
              />
            ) : null}
          </div>
          <SelectionDialog />
        </Dialog>
      </Layout>
    </NightIdGuard>
  );
};
