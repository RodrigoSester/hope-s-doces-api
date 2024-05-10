import axios, { api } from "src/boot/axios"
import { setToken } from "src/utils/token.utils";

export default {
  async login(body) {
    const response = await api.post('users/login', body)

    setToken(response.data.token)

    return response.data
  },
  async register(body) {
    const response = await api.post('/users', body);

    setToken(response.data.token)

    return response.data
  },
}