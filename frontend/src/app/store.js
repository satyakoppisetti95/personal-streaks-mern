import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import streakReducer from '../features/streaks/streakSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    streaks: streakReducer,
  },
});
