import { create } from 'zustand'

export const useCountStore = create(set => ({
  count: 0,
  inc: () => set(state => ({ count: state.count >= 9 ? 9 : state.count + 1 })),
  cut: () => set(state => ({ count: state.count <= 0 ? 0 : state.count - 1 }))
}))
