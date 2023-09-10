import { Wheel, spin } from '@packages/wheel';

import { WinnerView } from './WinnerView';
import { useGetMovieWheelOptions } from './hooks';

export const WheelPane = () => {
  const movieSelections = useGetMovieWheelOptions();

  return movieSelections.length > 0 ? (
    <>
      <Wheel options={movieSelections} radius={200} />
      <WinnerView />
      <button onClick={spin}>Spin</button>
    </>
  ) : null;
};
