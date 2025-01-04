import axios from 'axios';

export const fetchItems = async () => {
    try {
        const response = await axios.get('/api/items');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

