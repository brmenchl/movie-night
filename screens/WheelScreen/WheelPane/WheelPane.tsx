import Wheel from '@packages/wheel';

import { WinnerView } from './WinnerView';
import { useGetMovieWheelOptions, useSpinWheel } from './hooks';

export const WheelPane: React.FC = () => {
  const options = useGetMovieWheelOptions();
  const onClick = useSpinWheel();

  return options.length > 0 ? (
    <>
      <Wheel options={options} radius={200} />
      <WinnerView />
      <button onClick={onClick}>Spin</button>
    </>
  ) : null;
};
