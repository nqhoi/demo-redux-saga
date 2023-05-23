import { LoginPayload, authActions } from './authSlice'
import { call, delay, fork, put, take } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { customHistory } from 'utils'

function* handleLogin(payload: LoginPayload) {
  yield delay(1000)
  try {
    localStorage.setItem('access_token', 'fake_token')
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'User Test',
      })
    )

    customHistory.push('/admin')
  } catch (error) {
    // yield put(authActions.loginFailed(error.message))
  }
}

function* handleLogout() {
  yield delay(500)
  localStorage.removeItem('access_token')
  customHistory.push('/login')
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'))
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
      yield fork(handleLogin, action.payload)
    }

    yield take(authActions.logout.type)
    yield call(handleLogout)
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow)
}
