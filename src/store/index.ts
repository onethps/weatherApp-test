import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { cityListReducer, detailsReducer } from './slices';

const persistConfig = {
  key: 'root',
  storage,
};

export const rootReducer = combineReducers({
  home: cityListReducer,
  details: detailsReducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });
};

export const configuredStore = setupStore();

export const persistor = persistStore(configuredStore);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
