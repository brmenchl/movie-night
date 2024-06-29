import { useMovieSelections, usePickWinner } from '@/packages/movies';
import { Wheel } from '@/packages/wheel';
import { A } from '@mobily/ts-belt';
import moize from 'moize';
import { useCallback } from 'react';

export const WheelView = ({
  hasWinner,
  nightId,
}: {
  hasWinner: boolean;
  nightId: string;
}) => {
  const movieSelections = useMovieSelections(nightId);

  const pickWinner = usePickWinner();
  const pickWinnerByIndex = useCallback(
    (index: number) => {
      const winningSelection = movieSelections[index];
      pickWinner({ nightId, friendId: winningSelection.friendId });
    },
    [movieSelections, nightId, pickWinner],
  );

  return movieSelections.length > 0 ? (
    <Wheel
      options={lensTitle(movieSelections)}
      onSpinComplete={pickWinnerByIndex}
      disabled={hasWinner}
    />
  ) : null;
};

const lensTitle = moize(A.map((a: { title: string }) => a.title));
