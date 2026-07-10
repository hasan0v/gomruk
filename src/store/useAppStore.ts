import { create } from 'zustand'

type AppState = {
  dark: boolean
  sidebarOpen: boolean
  commandOpen: boolean
  toggleDark: () => void
  setSidebarOpen: (open: boolean) => void
  setCommandOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  dark: localStorage.getItem('vglp-theme') === 'dark',
  sidebarOpen: false,
  commandOpen: false,
  toggleDark: () => set((state) => {
    const dark = !state.dark
    localStorage.setItem('vglp-theme', dark ? 'dark' : 'light')
    return { dark }
  }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setCommandOpen: (commandOpen) => set({ commandOpen }),
}))
