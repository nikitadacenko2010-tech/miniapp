import { request } from './client'

export const reviewsApi = {
  list: () => request('/api/reviews'),
  create: (data) => request('/api/reviews', { method: 'POST', body: data }),
}