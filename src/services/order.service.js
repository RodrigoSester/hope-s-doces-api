import { api } from "src/boot/axios"

export default {
  async getAll() {
    const response = await api.get('/orders');
    return response.data;
  }
}