import { create } from 'zustand'
import { dealsApi } from '../api'

export const useDealsStore = create((set, get) => ({
  deals: [],
  loading: false,
  loaded: false,

  async load(force = false) {
    if (get().loaded && !force) return get().deals
    set({ loading: true })
    try {
      const deals = await dealsApi.list()
      set({ deals, loaded: true })
      return deals
    } finally {
      set({ loading: false })
    }
  },

  async create(payload) {
    const deal = await dealsApi.create(payload)
    set({ deals: [deal, ...get().deals] })
    return deal
  },
}))