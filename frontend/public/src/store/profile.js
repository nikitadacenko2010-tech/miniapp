import { create } from 'zustand'
import { profileApi } from '../api'

export const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  loaded: false,

  async load(force = false) {
    if (get().loaded && !force) return get().profile
    set({ loading: true })
    try {
      const profile = await profileApi.get()
      set({ profile, loaded: true })
      return profile
    } finally {
      set({ loading: false })
    }
  },

  async update(patch) {
    const current = get().profile || {}
    const next = { ...current, ...patch }
    set({ profile: next })
    await profileApi.update(next)
    return next
  },
}))