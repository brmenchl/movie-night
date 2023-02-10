import Wheel from "./Wheel";
import { useGetMovieWheelOptions, useSpinWheel } from "./hooks";
import { WinnerView } from "./WinnerView";
import { SpinControls } from "./Wheel/SpinControls";

export const WheelPane: React.FC = () => {
  const options = useGetMovieWheelOptions();
  const onClick = useSpinWheel();

  return options.length > 0 ? (
    <>
      <Wheel options={options} radius={200} />
      <SpinControls />
      <WinnerView />
      <button onClick={onClick}>Spin</button>
    </>
  ) : null;
};
