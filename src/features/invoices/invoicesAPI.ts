import axios from 'axios';

export const fetchInvoices = async () => {
  const response = await axios.get('/api/invoices');
  return response.data;
};