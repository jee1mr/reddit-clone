// Imports
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    let token = null
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      token = user.token
    } catch (error) {}

    if (token) {
      config.headers['Authorization'] = `Token ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
export default api
