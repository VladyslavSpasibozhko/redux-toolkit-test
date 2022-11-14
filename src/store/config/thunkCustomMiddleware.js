export function thunkMiddleware({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        action(dispatch, getState);
        return;
      }
      next(action);
    };
  };
}
