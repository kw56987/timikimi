import { FC, useContext, useRef, useEffect, useState, useCallback } from "react";
import Image from 'next/image'
import LogoPic from '../../../public/assets/img/logo.png'
import TwitterPic from '../../../public/assets/img/twitter.png'
import DiscordPic from '../../../public/assets/img/discord.png'
import BaseBtn from '../../ui/base-btn'
import BaseCtx from '../../../base-content'
import * as T from '../../../utils'
import { useWeb3, useSwitchNetwork } from '@3rdweb/hooks'

interface Prop { }

const Header: FC<Prop> = () => {

  const { setCurrentLan, currentLan, setShowModal, setShowWalletSelect, setShowToast, setToastText, setToastType, setLoading, currentChianId = '0', setShowNFT } = useContext(BaseCtx)
  const [isShowSwitch, setShowSwitch] = useState(false)

  const { address, chainId = 0, error } = useWeb3()
  const { switchNetwork } = useSwitchNetwork()

  const isFirstRender = useRef(true);

  const handleShowToast = useCallback((text: string) => {
    setShowToast!(true)
    setToastText!(text)
    setToastType!('Warn')

    const timer = setTimeout(() => {
      setShowToast!(false)
      clearTimeout(timer)
    }, 3000)
  }, [setShowToast, setToastText, setToastType])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (error?.message === 'The user rejected the request.') {
      handleShowToast('You rejected the request')
    }

    if (error?.message.includes('Unsupported chain id')) {
      setShowSwitch(true)
      handleShowToast(error?.message)
    } else {
      setShowSwitch(false)
    }

  }, [chainId, setLoading, currentChianId, handleShowToast, error]);

  return (
    <div className="h-nav bg-nav-bg flex items-center justify-between pl-nav-p pr-nav-p">
      <Image
        alt="logo"
        src={LogoPic}
        width={128}
        height={41}
      />
      <div className="flex items-center justify-end">
        <div
          onClick={() => {
            window.open('https://twitter.com/TimiKimiWeb3')
          }}
        >
          <Image
            alt="twitter"
            src={TwitterPic}
            width={32}
            height={32}
          />
        </div>
        <div
          className='ml-12 mr-12'
          onClick={() => {
            window.open('https://discord.gg/bhpedVXBTD')
          }}
        >
          <Image
            alt="twitter"
            src={DiscordPic}
            width={32}
            height={32}
          />
        </div>
        <div className="flex items-end justify-end mr-12">
          <div
            className={`text-white tracking-normal cursor-pointer ${currentLan === 'EN' ? 'text-2xl' : 'text-1xl'}`}
            onClick={() => {
              setCurrentLan('EN')
              localStorage.setItem('_current_lan', 'EN')
            }}
          >EN</div>
          <div className="text-white text-2xl tracking-normal">/</div>
          <div
            className={`text-white tracking-normal cursor-pointer ${currentLan === 'JP' ? 'text-2xl' : 'text-1xl'}`}
            onClick={() => {
              setCurrentLan('JP')
              localStorage.setItem('_current_lan', 'JP')
            }}
          >JP</div>
        </div>
        {
          address
            ?
            <div className="flex items-center justify-center">
              {
                !T.SUPPORTED_CHAIN_IDS.includes(chainId)
                  ?
                  <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-orange-100 mr-6">
                    <div className="w-2 h-2 rounded bg-gradient-to-r from-orange-200 to-orange-300 border border-white mr-2.5 drop-shadow-dot-shadow-100"></div>
                    <div className="text-base text-white">Err Network</div>
                  </div>
                  :
                  <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-white mr-6">
                    <div className="w-2 h-2 rounded bg-gradient-to-r from-green-100 to-green-200 border border-white mr-2.5 drop-shadow-dot-shadow"></div>
                    <div className="text-base text-f-black">{T.DEFAULT_CHAIN[chainId].chainName}</div>
                  </div>
              }
              <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-white">
                <div className="text-lg text-f-black">{T.formatAddress(address)}</div>
              </div>
            </div>
            :
            <BaseBtn
              btnText={!isShowSwitch ? T.Lan[currentLan].connect : T.Lan[currentLan].switch}
              handleClick={() => {
                if (isShowSwitch) {
                  switchNetwork(T.DEFAULT_SUPPORTED_CHAIN_ID)
                } else {
                  setShowModal!(true)
                  setShowWalletSelect!(true)
                  setShowNFT!(false)
                }
              }}
            />
        }
      </div>
    </div >
  )
}

export default Header