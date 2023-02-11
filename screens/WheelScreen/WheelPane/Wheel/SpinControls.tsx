import {
  durationRange,
  initialSpeedRange,
  selectWheelSpinProperties,
  setDuration,
  setInitialSpeed,
} from '../wheelSlice';
import { pipe } from '@mobily/ts-belt';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { useCallback } from 'react';
import { Slider } from 'rsuite';

const [initialSpeedMin, initialSpeedMax] = initialSpeedRange;
const [dragMin, dragMax] = durationRange;

export const SpinControls = () => {
  const dispatch = useAppDispatch();

  const { initialSpeed, duration: drag } = useAppSelector(
    selectWheelSpinProperties
  );

  const onInitialSpeedChange = useCallback(
    (value: number) => pipe(value, setInitialSpeed, dispatch),
    [dispatch]
  );

  const onDurationChange = useCallback(
    (value: number) => pipe(value, setDuration, dispatch),
    [dispatch]
  );

  return (
    <>
      <Slider
        min={initialSpeedMin}
        max={initialSpeedMax}
        onChange={onInitialSpeedChange}
        value={initialSpeed}
        tooltip={false}
      />
      <div style={{ marginTop: 20 }}>
        <Slider
          min={dragMin}
          max={dragMax}
          onChange={onDurationChange}
          value={drag}
          tooltip={false}
        />
      </div>
    </>
  );
};
