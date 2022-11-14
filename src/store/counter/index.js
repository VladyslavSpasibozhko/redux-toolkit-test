import {
  createReducer,
  createAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
  counter: 0,
  pending: false,
};

export const increment = createAction('increment');
export const decrement = createAction('decrement');

export const incrementAsyncExecutor = createAsyncThunk(
  'incrementAsync',
  async (value) => {
    const execution = await new Promise((resolve) => {
      setTimeout(() => resolve(value), 1000);
    });

    return execution;
  },
);

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.counter += 1;
    })
    .addCase(decrement, (state) => {
      state.counter -= 1;
    })
    .addCase(incrementAsyncExecutor.fulfilled, (state, action) => {
      state.counter += action.payload;
      state.pending = false;
    })
    .addCase(incrementAsyncExecutor.pending, (state) => {
      state.pending = true;
    });
});
