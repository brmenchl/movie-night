import { Wheel } from '@/packages/wheel';

import { useGetMovieWheelOptions } from './hooks';
import { useNightId } from '@/packages/nights';
import { usePickWinnerByIndex } from '@/packages/movies';

export const WheelPane = () => {
  const movieSelections = useGetMovieWheelOptions();
  const nightId = useNightId();
  const pickWinnerByIndex = usePickWinnerByIndex(nightId);

  return movieSelections.length > 0 ? (
    <div className="h-full w-full flex items-center justify-center">
      <Wheel options={movieSelections} onSpinComplete={pickWinnerByIndex} />
    </div>
  ) : null;
};
