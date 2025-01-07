import { configureStore } from '@reduxjs/toolkit';
import launchesSlice from './features/launches/launchesSlice';

export const store = configureStore({
  reducer: {
    launches: launchesSlice,
  },
});
