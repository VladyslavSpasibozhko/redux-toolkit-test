import { createSlice } from '@reduxjs/toolkit';
import { isObject } from '../../utils/object';
import { decrement, increment } from '../counter';

const initialState = {
  users: [],
  limit: 1,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    removeUser: {
      prepare: (value) => ({ payload: isObject(value) ? value.id : value }),
      reducer: (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      },
    },
  },
  extraReducers: {
    [increment]: (state) => {
      if (state.limit < 10) {
        state.limit += 1;
      }
    },
    [decrement]: (state) => {
      if (state.limit > 0) {
        state.limit -= 1;
      }
    },
  },
});

export const { setUsers, removeUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
