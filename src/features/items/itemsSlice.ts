import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Item {
  id: number;
  name: string;
  price: number;
}

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = itemSlice.actions;
export default itemSlice.reducer;
