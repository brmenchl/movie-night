import { NightIdGuard, useNightId } from '@/packages/nights';
import { SelectionDialog, SelectionDialogTrigger } from './SelectionDialog';
import { Dialog } from '@/components/ui/dialog';
import { Layout } from '@/components/Layout';
import { useMovieSelections, usePickWinnerByIndex } from '@/packages/movies';
import { Wheel } from '@/packages/wheel';
import { A } from '@mobily/ts-belt';
import moize from 'moize';

export const NightDetail = () => {
  const nightId = useNightId();
  const movieSelections = lensTitle(useMovieSelections(nightId));
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

const lensTitle = moize(A.map((a: { title: string }) => a.title));
