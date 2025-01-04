import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../features/items/ItemsSlice';
import invoicesReducer from '../features/invoices/invoicesSlice';

const store = configureStore({
  reducer: {
    items: itemsReducer,
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;