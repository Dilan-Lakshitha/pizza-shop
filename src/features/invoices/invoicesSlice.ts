import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: number;
  customerName: string;
  items: { id: number; name: string; quantity: number }[];
  totalAmount: number;
}

const initialState: Invoice[] = [];

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.push(action.payload);
    },
    removeInvoice: (state, action: PayloadAction<number>) => {
      return state.filter(invoice => invoice.id !== action.payload);
    },
  },
});

export const { addInvoice, removeInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
