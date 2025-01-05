import React, { useEffect, useState } from 'react';
import { fetchItems } from '../features/items/itemsAPI';
import toast, { Toaster } from 'react-hot-toast';

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

interface Item {
  name: string;
  price: number;
}

const InvoiceManagement: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems);
        console.log('Fetched items:', fetchedItems);
      } catch (err) {
        console.error('Error loading items:', err);
      }
    };

    loadItems();
  }, []);

  const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = items.find((item) => item.name === e.target.value);
    if (selectedItem) {
      setNewItem({ ...newItem, name: selectedItem.name, price: selectedItem.price });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, quantity: +e.target.value });
  };

  const addInvoiceItem = () => {
    if (!newItem.name || newItem.quantity <= 0) {
      alert('Please select an item and enter a valid quantity!');
      return;
    }
    setInvoiceItems([...invoiceItems, newItem]);
    setNewItem({ name: '', quantity: 1, price: 0 });
    toast.success('Item added successfully!');
  };

  const calculateItemTotal = (item: InvoiceItem) => {
    return item.quantity * item.price;
  };

  const calculateTax = (amount: number) => {
    return amount * 0.10;
  };

  const calculateTotal = () => {
    const subtotal = invoiceItems.reduce((total, item) => total + calculateItemTotal(item), 0);
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  return (
    <div className="p-6 bg-gray-100">
      <Toaster/>
      <h1 className="text-2xl font-bold mb-4">Invoice Management</h1>
      <div className="mb-6">
        <select
          value={newItem.name}
          onChange={handleItemChange}
          className="border p-2 mr-2"
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={handleQuantityChange}
          className="border p-2 mr-2"
          min={1}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          readOnly
          className="border p-2 mr-2 bg-gray-200"
        />
        <button
          onClick={addInvoiceItem}
          className="bg-gray-900 rounded-full text-white px-4 py-2"
        >
          Add to Invoice
        </button>
      </div>
      <table className="table-auto w-full bg-white shadow-lg">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Tax (10%)</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => {
            const itemTotal = calculateItemTotal(item);
            const tax = calculateTax(itemTotal);
            return (
              <tr key={index}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="border px-4 py-2">${itemTotal.toFixed(2)}</td>
                <td className="border px-4 py-2">${tax.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-4">
        Total (with tax): ${calculateTotal().toFixed(2)}
      </h2>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gray-900 rounded-full text-white px-4 py-2 mt-4 rounded"
      >
        Print Invoice
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
            <table className="table-auto w-full bg-gray-100 shadow-md">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Item</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Tax (10%)</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => {
                  const itemTotal = calculateItemTotal(item);
                  const tax = calculateTax(itemTotal);
                  return (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">{item.quantity}</td>
                      <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                      <td className="border px-4 py-2">${itemTotal.toFixed(2)}</td>
                      <td className="border px-4 py-2">${tax.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3 className="text-xl font-bold mt-4">
              Total (with tax): ${calculateTotal().toFixed(2)}
            </h3>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-900 rounded-full text-white px-4 py-2 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-900 rounded-full text-white px-4 py-2 rounded"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceManagement;
