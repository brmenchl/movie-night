import { Slice } from "@reduxjs/toolkit";

type SliceState<S extends Slice<any, any, any>> = S extends Slice<
  infer State,
  any,
  infer Name
>
  ? { [k in Name]: State }
  : never;

type StateOf<S extends Slice<any, any, any>> = S extends Slice<
  infer State,
  any,
  any
>
  ? State
  : never;

export const getSlice =
  <S extends Slice<any, any, any>>(s: S) =>
  (state: SliceState<S>): StateOf<S> =>
    state[s.name];
