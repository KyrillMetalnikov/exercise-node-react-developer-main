import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import repoSlice from '../store/repoSlice';

export const store = configureStore({
  reducer: {
    repos: repoSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
