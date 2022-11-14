import { createReducer, createAction } from '@reduxjs/toolkit';
import { uniqueId } from '../../utils/uniqueId';

const initialState = {
  actions: [],
  lastAction: null,
};

export const addAction = createAction('addAction');
export const removeAction = createAction('removeAction');
export const removeAllActions = createAction('removeAllActions');

const isNotLoggerAction = (action) => {
  return ![
    addAction.toString(),
    removeAction.toString(),
    removeAllActions.toString(),
  ].includes(action.type);
};

export const loggerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAction, (state, action) => {
      state.actions.push({
        ...action,
        id: uniqueId(),
      });
    })
    .addCase(removeAction, (state, action) => {
      state.actions = state.actions.filter((a) => a.id !== action.payload);

      if (state.lastAction && state.lastAction === action.payload) {
        state.lastAction = null;
      }
    })
    .addCase(removeAllActions, (state) => {
      state.actions = [];
      state.lastAction = [];
    })
    .addMatcher(isNotLoggerAction, (state, action) => {
      state.actions.push({
        ...action,
        id: uniqueId(),
      });
    });
});
