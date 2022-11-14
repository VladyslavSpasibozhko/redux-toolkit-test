import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from './counter';
import { loggerReducer } from './logger';
import { reducer, reducerPath, middleware } from './api';
import { usersReducer } from './users';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    [reducerPath]: reducer,
    users: usersReducer,
    counter: counterReducer,
    logger: loggerReducer,
  },
  middleware: (get) => get({ serializableCheck: false }).concat(middleware),
});

setupListeners(store.dispatch);
