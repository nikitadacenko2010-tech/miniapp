import { request } from './client'

export const dealsApi = {
  list: () => request('/api/deals'),
  get: (id) => request(`/api/deals/${id}`),
  create: (data) => request('/api/deals', { method: 'POST', body: data }),
}