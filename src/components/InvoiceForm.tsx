import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addInvoice } from '../features/invoices/invoicesSlice';
import { RootState } from '../app/store';

const InvoiceForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ id: number; quantity: number; name: string }[]>([]);
  const items = useSelector((state: RootState) => state.items.items); 
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalAmount = selectedItems.reduce((sum, item) => {
      const itemDetails = items.find((i: any) => i.id === item.id);
      return sum + (itemDetails?.price || 0) * item.quantity;
    }, 0);

    const newInvoice = { 
      id: Date.now(), 
      customerName, 
      items: selectedItems, 
      totalAmount 
    };

    dispatch(addInvoice(newInvoice));

    setCustomerName('');
    setSelectedItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="p-2 border rounded"
      />
      <div>
        <h3>Select Items</h3>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <span>{item.name}</span>
            <input
              type="number"
              value={selectedItems.find(i => i.id === item.id)?.quantity || 0}
              onChange={(e) => {
                const quantity = Number(e.target.value);
                setSelectedItems(prev =>
                  prev.some(i => i.id === item.id)
                    ? prev.map(i => i.id === item.id ? { ...i, quantity } : i)
                    : [...prev, { id: item.id, quantity, name: item.name }] // Add name here
                );
              }}
              className="p-2 border rounded w-16"
            />
          </div>
        ))}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Invoice</button>
    </form>
  );
};

export default InvoiceForm;
