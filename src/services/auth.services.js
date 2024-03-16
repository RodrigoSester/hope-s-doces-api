import axios, { api } from "src/boot/axios"
import { setToken } from "src/utils/token.utils";

export default {
  async login(email, password) {
    const response = await api.post('users/login', { email, password })

    setToken(response.data.token)

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    return response.data
  },
  async register(body) {
    const response = await api.post('/users', body);

    setToken(response.data.token)

    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

    return response.data
  },
}