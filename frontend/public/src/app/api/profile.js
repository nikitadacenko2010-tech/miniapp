import { request } from './client'

export const profileApi = {
  get: () => request('/api/profile'),
  update: (data) => request('/api/profile', { method: 'PUT', body: data }),
}