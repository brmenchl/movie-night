import { Wheel, spin } from '@packages/wheel';

import { WinnerView } from './WinnerView';
import { useGetMovieWheelOptions } from './hooks';
import { Button } from '@components/Button';

export const WheelPane = () => {
  const movieSelections = useGetMovieWheelOptions();

  return movieSelections.length > 0 ? (
    <>
      <Wheel options={movieSelections} radius={200} />
      <WinnerView />
      <Button.Solid onClick={spin}>Spin</Button.Solid>
    </>
  ) : null;
};
