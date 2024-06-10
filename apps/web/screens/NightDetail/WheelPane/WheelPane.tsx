import { Wheel, spin } from '@/packages/wheel';

import { useGetMovieWheelOptions } from './hooks';
import { Button } from '@/components/ui/button';

export const WheelPane = () => {
  const movieSelections = useGetMovieWheelOptions();

  return movieSelections.length > 0 ? (
    <div className="flex flex-col items-center p-10">
      <Wheel options={movieSelections} radius={500} />
      <Button onClick={spin}>Spin</Button>
    </div>
  ) : null;
};
