import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import appSlice from './app.slice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'awsfrontapp',
  storage,
  whitelist: [],
};

const store = configureStore({
  reducer: {
    app: persistReducer(persistConfig, appSlice),
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
