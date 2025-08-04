import { configureStore } from '@reduxjs/toolkit';
import customersReducer from '../features/customers/customerSlice';
import customerDetailReducer from '../features/customers/customerDetailSlice';

export const store = configureStore({
  reducer: {
    customers: customersReducer,
    customerDetail: customerDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
