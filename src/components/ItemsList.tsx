import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../features/items/ItemsSlice';
import { RootState } from '../app/store';

const ItemList: React.FC = () => {
  const items = useSelector((state: RootState) => state.items.items); 
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      <ul>
        {items.map((item: { id: number; name: string; price: number }) => (  // Explicitly type `item`
          <li key={item.id} className="flex justify-between items-center">
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => dispatch(deleteItem(item.id))} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
