import axios, { api } from "src/boot/axios"

export default {
  async getAll() {
    const response = await api.get('http://localhost:3000/orders')
    return response.data
  }
}