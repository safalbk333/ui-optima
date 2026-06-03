import { configureStore } from '@reduxjs/toolkit';
import contractManagementReducer from './ContractManagement/ContractManagementSlice';

export const store = configureStore({
  reducer: {
    contractManagement: contractManagementReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;