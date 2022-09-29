import { createContext } from 'react'
interface BaseDate {
  currentLan: 'JP' | 'EN',
  setCurrentLan: (v: 'JP' | 'EN') => void,
  isShowToast?: boolean,
  setShowToast?: (v: boolean) => void,
  toastText?: string,
  setToastText?: (v: string) => void,
  toastType?: 'Warn' | 'Info',
  setToastType?: (v: 'Warn' | 'Info') => void,
  isShowModal?: boolean,
  setShowModal?: (v: boolean) => void,
  isShowWalletSelect?: boolean,
  setShowWalletSelect?: (v: boolean) => void,
  isShowNFT?: boolean,
  setShowNFT?: (v: boolean) => void,
  currentAccount?: string,
  setCurrentAccount?: (v: string) => void
  currentChianId?: string,
  setCurrentChianId?: (v: string) => void,
  loading?: boolean,
  setLoading?: (v: boolean) => void,
  nftInfo?: {
    id?: string
  }
  setNftInfo?: (v: {id: string}) => void
}

export const initialState: BaseDate = {
  currentLan: 'JP',
  setCurrentLan: () => {},
}

const BaseCtx = createContext(initialState);

export default BaseCtx;