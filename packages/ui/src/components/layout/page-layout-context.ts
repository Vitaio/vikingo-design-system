import { createContext, useContext } from 'react'

interface PageLayoutContextValue {
  openMobileMenu: () => void
}

export const PageLayoutContext = createContext<PageLayoutContextValue | null>(null)

export function usePageLayout() {
  return useContext(PageLayoutContext)
}
