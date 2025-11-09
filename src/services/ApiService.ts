import axios from 'axios';

const API_URL = 'https://your-streamcart-backend.vercel.app/api';

export const ApiService = {
  async syncInventory(csvUrl: string) {
    const res = await axios.post(`${API_URL}/sync`, { csvUrl });
    return res.data.products;
  },

  async createCheckout(item: any) {
    const res = await axios.post(`${API_URL}/checkout`, { item });
    return res.data.url;
  },
};
