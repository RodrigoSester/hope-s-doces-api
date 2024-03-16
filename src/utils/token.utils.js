import { jwtDecode } from "jwt-decode";

const checkTokenExpiration = (token) => {
  const decoded = jwtDecode(token);
  const expirationDate = new Date(decoded.exp * 1000);

  return expirationDate < new Date();
}

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token && !checkTokenExpiration(token);
}

const getToken = () => {
  return localStorage.getItem('token');
}

const setToken = (token) => {
  localStorage.setItem('token', token);
}

const removeToken = () => {
  localStorage.removeItem('token');
}

export {
  checkTokenExpiration,
  isAuthenticated,
  getToken,
  setToken,
  removeToken
}