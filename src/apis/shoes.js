import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000' })

export const getShoes = () => api.get('/shoes')
export const getShoe = (id) => api.get(`/shoes/${id}`)
export const createShoe = (shoeData) => api.post('/shoes', shoeData)
export const updateShoe = (id, shoeData) => api.put(`/shoes/${id}`, shoeData)
export const deleteShoe = (id) => api.delete(`/shoes/${id}`)