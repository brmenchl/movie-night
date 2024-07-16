import {
  useClearWinner,
  useMovieSelections,
  usePickWinner,
} from '@/packages/movies';
import { useNightById } from '@/packages/nights/hooks';
import { Wheel } from '@/packages/wheel';
import { A, D, O } from '@mobily/ts-belt';
import moize from 'moize';
import { useCallback } from 'react';

export const WheelView = ({ nightId }: { nightId: string }) => {
  const spinAgainCount = O.mapWithDefault(
    useNightById(nightId),
    0,
    D.getUnsafe('spinAgainCount'),
  );

  const movieSelections = useMovieSelections(nightId);

  const clearWinner = useClearWinner(nightId);
  const pickWinner = usePickWinner();

  const options = getOptions(movieSelections, spinAgainCount);

  const pickWinnerByIndex = useCallback(
    (index: number) => {
      const winningOption = options[index];
      const winningSelection = O.toUndefined(
        A.find(
          movieSelections,
          (selection) => selection.title === winningOption,
        ),
      );
      if (winningSelection === undefined) return;
      pickWinner({ nightId, friendId: winningSelection.friendId });
    },
    [movieSelections, nightId, options, pickWinner],
  );

  return options.length > 0 ? (
    <Wheel
      options={options}
      onSpinStart={clearWinner}
      onSpinComplete={pickWinnerByIndex}
    />
  ) : null;
};

const getOptions = moize(
  (selections: ReturnType<typeof useMovieSelections>, spinAgainCount: number) =>
    A.concat(
      A.map(selections, D.getUnsafe('title')),
      A.make(spinAgainCount, 'Spin Again'),
    ),
);
