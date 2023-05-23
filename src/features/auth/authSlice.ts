import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from 'models'

export interface LoginPayload {
  username: string
  password: string
}

export interface AuthState {
  isLoggedIn?: boolean
  logging?: boolean
  currentUser?: User
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true
      state.logging = false
      state.currentUser = action.payload
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLoggedIn = false
    },

    logout(state) {
      state.isLoggedIn = false
      state.currentUser = undefined
    },
  },
})

// Actions
export const authActions = authSlice.actions

// Selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn
export const selectIsLogging = (state: any) => state.auth.logging

// Reducer
const authReducer = authSlice.reducer
export default authReducer
