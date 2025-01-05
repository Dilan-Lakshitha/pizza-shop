import axios from 'axios';
import api from '../../api';

export const fetchInvoices = async () => {
  const response = await axios.get('/api/invoices');
  return response.data;
};


export const createInvoice = async (invoice:any) => {
  try {
      const response = await api.post('/api/invoices', invoice);
      return response.data;
  } catch (error) {
      console.error('Error creating item:', error);
      throw error;
  }
};