import { request } from './client'

export const withdrawApi = {
  submit: (data) => request('/api/withdraw', { method: 'POST', body: data }),
  balance: () => request('/api/balance'),
}