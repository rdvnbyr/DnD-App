import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/auth/core/auth-slice';
import workspaceReducer from '../modules/workspace/core/workspace-slice';
import { authApi } from '../modules/auth/core/auth-api';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage/session';
import { workspaceApi } from '../modules/workspace/core/workspace-api';

const persistConfigs = {
  auth: {
    key: 'tsx-client-auth',
    storage,
    whitelist: ['isAuthenticated', 'token', 'user'],
  },
  authApi: {
    key: 'tsx-client-auth-api',
    storage,
    whitelist: [],
  },
  workspace: {
    key: 'tsx-client-workspace',
    storage,
    whitelist: ['workspaces'],
  },
  workspaceApi: {
    key: 'tsx-client-workspace-api',
    storage,
    whitelist: [],
  },
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfigs.auth, authReducer),
    [authApi.reducerPath]: persistReducer(persistConfigs.authApi, authApi.reducer),
    workspace: persistReducer(persistConfigs.workspace, workspaceReducer),
    [workspaceApi.reducerPath]: persistReducer(persistConfigs.workspaceApi, workspaceApi.reducer),
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(workspaceApi.middleware),
});

const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
