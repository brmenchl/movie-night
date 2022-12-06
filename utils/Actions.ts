interface ActionWithPayload<TAction, TPayload>
  extends ActionWithoutPayload<TAction> {
  payload: TPayload;
}

interface ActionWithoutPayload<TAction> {
  type: TAction;
}

interface ActionCreatorsMapObject {
  [key: string]: (
    ...args: any[]
  ) => ActionWithPayload<any, any> | ActionWithoutPayload<any>;
}

export const createActionWithPayload =
  <Action, Payload>(actionType: Action) =>
  (payload: Payload): ActionWithPayload<Action, Payload> => ({
    type: actionType,
    payload,
  });

export const createAction =
  <Action>(actionType: Action) =>
  (): ActionWithoutPayload<Action> => ({ type: actionType });

export type Actions<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
