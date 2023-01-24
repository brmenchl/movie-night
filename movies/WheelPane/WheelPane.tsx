import Wheel from "@components/Wheel";
import { useGetMovieWheelOptions } from "./hooks";

export const WheelPane: React.FC = () => {
  const options = useGetMovieWheelOptions();

  return <Wheel options={options} radius={200} />
}