import api from '../../api'; // Path to your `axios` instance

export const fetchItems = async () => {
    try {
        const response = await api.get('/api/items');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createItem = async (itemData:any) => {
    try {
        const response = await api.post('/api/items', itemData);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

export const deleteItem = async (id: number) => {
    try {
        const response = await api.delete(`/api/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
};