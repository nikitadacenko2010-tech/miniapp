import { request } from './client'

export const requisitesApi = {
  list: () => request('/api/requisites'),
  create: (data) => request('/api/requisites', { method: 'POST', body: data }),
  remove: (id) => request(`/api/requisites/${id}`, { method: 'DELETE' }),
}