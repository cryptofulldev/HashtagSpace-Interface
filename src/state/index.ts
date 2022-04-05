import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { save, load } from 'redux-localstorage-simple'
import { updateVersion } from './actions/global'
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
import { createBrowserHistory, History } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'
import application from './reducers/application'
import actions from './reducers/actions'
import info from './reducers/info'
import modals from './reducers/modals'
import transaction from './reducers/transaction'
import user from './reducers/user'

const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    actions,
    user,
    modals,
    transaction,
    info,
    application,
  })

export const rootReducer = createRootReducer(history)
const PERSISTED_KEYS: string[] = ['user']

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, save({ states: PERSISTED_KEYS, debounce: 1000 }))
  )
)

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(rootSaga)
store.dispatch(updateVersion())
setupListeners(store.dispatch)

export default store
