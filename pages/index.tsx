import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import BaseCtx from '../base-content'
import Base from '../components/base'
import * as T from '../utils'
import Header from '../components/common/header'
import MintContent from '../components/mint-content'
import BaseModal from '../components/ui/base-modal'
import NftContent from '../components/nft-content'
import BaseToast from '../components/ui/base-toast'
import WalletSelect from '../components/wallet-select/indexs'
import BaseLoading from '../components/ui/base-loading'

const Home: NextPage = () => {
  const [currentLan, setCurrentLan] = useState<'JP' | 'EN'>('EN')
  const [isShowToast, setShowToast] = useState<boolean>(false)
  const [toastText, setToastText] = useState<string>('')
  const [toastType, setToastType] = useState<'Warn' | 'Info'>('Info')
  const [isShowModal, setShowModal] = useState<boolean>(false)
  const [isShowWalletSelect, setShowWalletSelect] = useState<boolean>(false)
  const [isShowNFT, setShowNFT] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [nftInfo, setNftInfo] = useState<{ id: string }>({ id: '0' })
  const [currentChianId, setCurrentChianId] = useState<string>('')

  useEffect(() => {
    const storageLan = localStorage.getItem('_current_lan') as 'JP' | 'EN'
    
    if (storageLan) {
      setCurrentLan(storageLan)
    }
  }, [])

  return (
    <BaseCtx.Provider value={{ currentLan, setCurrentLan, isShowToast, setShowToast, isShowModal, setShowModal, isShowWalletSelect, setShowWalletSelect, isShowNFT, setShowNFT, toastText, setToastText, toastType, setToastType, loading, setLoading, nftInfo, setNftInfo, currentChianId, setCurrentChianId }}>
      <Base
        tdk={{ title: 'Timikimi | Home page' }}
      >
        <Header />
        <div className='flex items-center justify-center'>
          <MintContent />
        </div>
        {
          loading
          &&
          <BaseLoading />
        }
        {
          isShowToast
          &&
          <BaseToast
            text={toastText}
            type={toastType}
          />
        }
        {
          isShowModal
          &&
          <BaseModal>
            {
              isShowNFT && <NftContent id={nftInfo.id} />
            }
            {
              isShowWalletSelect && <WalletSelect />
            }
          </BaseModal>
        }
      </Base>
    </BaseCtx.Provider >
  )
}

export default Home
