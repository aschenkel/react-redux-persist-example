import { persistStore, persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux'
import { createStateSyncMiddleware, withReduxStateSync, initStateWithPrevTab } from 'redux-state-sync'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

const middlewares = [createStateSyncMiddleware({})]

const persistConfig = {
  key: 'root',
  storage: storage,
}

const wrappedRootReducer = withReduxStateSync(rootReducer)
const persistedReducer = persistReducer(persistConfig, wrappedRootReducer)
export default () => {
  const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares))
  initStateWithPrevTab(store)

  let persistor = persistStore(store)
  return { store, persistor }
}
