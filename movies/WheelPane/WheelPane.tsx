import { Wheel } from "@components/Wheel";
import { useAppDispatch } from "@redux/hooks";
import { useCallback } from "react";
import { useGetMovieWheelOptions } from "./hooks";
import { spin } from "./wheelSlice";

export const WheelPane: React.FC = () => {
  const options = useGetMovieWheelOptions();
  const dispatch = useAppDispatch();
  const onClick = useCallback(() => dispatch(spin()), [dispatch]);

  return (
    <>
      <Wheel options={options} radius={200} />
      <button onClick={onClick}>
        Spin
      </button>
    </>
  );
};
