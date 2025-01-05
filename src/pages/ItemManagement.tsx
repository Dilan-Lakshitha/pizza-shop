import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createItem, deleteItem, fetchItems } from '../features/items/itemsAPI';
import toast, { Toaster } from 'react-hot-toast';

interface Item {
    id: number;
    name: string;
    price: number;
    category: string;
}

const ItemManagement: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItem, setNewItem] = useState({ name: '', price: 0, category: '' });
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setNewItem({ ...newItem, price: value ? parseFloat(value) : 0 });
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a valid price.');
        }
    };

    useEffect(() => {
        const loadItems = async () => {
            try {
                const fetchedItems = await fetchItems();
                setItems(fetchedItems);
                console.log(fetchItems);
            } catch (err) {
                console.error('Error loading items:', err);
            }
        };
        loadItems();
    }, []);

    const handleAddItem = async () => {
        if (!newItem.name || newItem.price <= 0 || !newItem.category) {
            alert('Please fill in all fields with valid data!');
            return;
        }

        try {
            const addedItem = await createItem(newItem);
            setItems([...items, addedItem]);
            setNewItem({ name: '', price: 0, category: '' });

            toast.success('Item added successfully!');
        } catch (error) {
            toast.error('Failed to add item!');
        }
    };


    const handleDeleteItem = async (id: number) => {
        try {
            await deleteItem(id);
            setItems((prevItems) => prevItems.filter((item) => item.id !== id));

            toast.success('Item deleted successfully!');
        } catch (error) {
            toast.error('Failed to delete item!');
        }
    };
    return (
        <div className="p-6 bg-gray-100">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4">Item Management</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="border p-2 mr-2"
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={handlePriceChange}
                    className="border p-2 mr-2"
                />
                {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="border p-2 mr-2"
                >
                    <option value="">Select Category</option>
                    <option value="pizza">Pizza</option>
                    <option value="toppings">Topping</option>
                    <option value="beverages">Beverage</option>
                </select>
                <button onClick={handleAddItem} className="bg-gray-900 rounded-full text-white px-4 py-2">
                    Add Item
                </button>
            </div>
            <table className="table-auto w-full bg-white shadow-lg">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Category</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.price}</td>
                            <td className="border px-4 py-2">{item.category}</td>
                            <td className="border px-4 py-2 items-center justify-center align-center">
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="bg-red-900 rounded-full text-white px-4 py-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemManagement;
