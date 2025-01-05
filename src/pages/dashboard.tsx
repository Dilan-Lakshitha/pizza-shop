import React, { useEffect, useState } from 'react';
// import ItemForm from '../components/ItemForm';
// import ItemList from '../components/ItemsList';
import MargheritaImage from '../assest/pngegg.png';
import Pepperoni from '../assest/pngegg (1).png';
import beverage from '../assest/beverage.png';
import topping from '../assest/topping (1).png';
import { fetchItems } from '../features/items/itemsAPI';
import { PizzaItem } from '../models/PizzzaItms';

const Dashboard: React.FC = () => {

    const [items, setItems] = useState<PizzaItem[]>([]);

    const categoryImageMap: { [key: string]: string } = {
        pizza: MargheritaImage,
        beverages: beverage,
        toppings: topping,
    };

    useEffect(() => {
        const loadItems = async () => {
            try {
                const fetchedItems = await fetchItems();
                const updatedItems = fetchedItems.map((item: PizzaItem) => ({
                    ...item,
                    image: categoryImageMap[item.category] || '',
                }));
                setItems(updatedItems);
            } catch (err) {
                console.error('Error loading items:', err);
            }
        };

        loadItems();
    }, []);


    return (
        <div className="space-y-6">
            {/* <h1>Item Management</h1> */}
            {/* <ItemForm />
            <ItemList /> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                        <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg mb-4" />
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="text-blue-500 font-semibold">${item.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
