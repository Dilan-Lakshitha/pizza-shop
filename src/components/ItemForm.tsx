import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/items/ItemsSlice';


const ItemForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, price };
    dispatch(addItem(newItem));
    setName('');
    setPrice(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Item</button>
    </form>
  );
};

export default ItemForm;
