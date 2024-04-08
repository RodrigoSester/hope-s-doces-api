import { api } from "src/boot/axios"
import { getToken } from "src/utils/token.utils"

export default {
  async getAll() {
    const token = getToken();
    const response = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  }
}