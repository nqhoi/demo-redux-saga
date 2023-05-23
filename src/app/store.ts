import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
import counterReducer from '../features/counter/counterSlice'
import rootSaga from './rootSaga'
import dashBoardReducer from 'features/dashboard/dashboardSlice'
import studentReducer from 'features/student/studentSlice'
import cityReducer from 'features/city/citySlice'

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  dashboard: dashBoardReducer,
  student: studentReducer,
  city: cityReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
