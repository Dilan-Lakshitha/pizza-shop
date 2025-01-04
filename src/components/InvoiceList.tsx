import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeInvoice } from '../features/invoices/invoicesSlice';
import { RootState } from '../app/store';

const InvoiceList: React.FC = () => {
    const invoices = useSelector((state: RootState) => state.invoices);
  const dispatch = useDispatch();

  return (
    <div className="space-y-4">
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id} className="flex justify-between items-center">
            <span>Invoice #{invoice.id} - {invoice.customerName} - ${invoice.totalAmount}</span>
            <button onClick={() => dispatch(removeInvoice(invoice.id))} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
