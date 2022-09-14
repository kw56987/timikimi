import { createContext } from 'react'

interface BaseDate {
  currentLan: 'JP' | 'EN',
  setCurrentLan: (v: 'JP' | 'EN') => void
}

export const initialState: BaseDate = {
  currentLan: 'JP',
  setCurrentLan: () => {}
}

const BaseCtx = createContext(initialState);

export default BaseCtx;