import React from 'react';
import InvoiceForm from '../components/InvoiceForm';
import InvoiceList from '../components/InvoiceList';

const InvoiceManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1>Invoice Management</h1>
      <InvoiceForm />
      <InvoiceList />
    </div>
  );
};

export default InvoiceManagement;
