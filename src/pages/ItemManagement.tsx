import React from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemsList';

const ItemManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1>Item Management</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
};

export default ItemManagement;
