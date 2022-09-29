import { FC, useContext } from "react";
import Image from 'next/image'
import LogoPic from '../../../public/assets/img/logo.png'
import TwitterPic from '../../../public/assets/img/twitter.png'
import DiscordPic from '../../../public/assets/img/discord.png'
import BaseBtn from '../../ui/base-btn'
import BaseCtx from '../../../base-content'
import * as T from '../../../utils'

interface Prop { }

const Header: FC<Prop> = () => {

  const { setCurrentLan, currentLan, setShowModal, setShowWalletSelect, currentAccount, currentChianId } = useContext(BaseCtx)

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
          currentAccount
            ?
            <div className="flex items-center justify-center">
              {
                currentChianId !== '0x13881'
                  ?
                  <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-orange-100 mr-6">
                    <div className="w-2 h-2 rounded bg-gradient-to-r from-orange-200 to-orange-300 border border-white mr-2.5 drop-shadow-dot-shadow-100"></div>
                    <div className="text-base text-white">Err Network</div>
                  </div>
                  :
                  <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-white mr-6">
                    <div className="w-2 h-2 rounded bg-gradient-to-r from-green-100 to-green-200 border border-white mr-2.5 drop-shadow-dot-shadow"></div>
                    <div className="text-base text-f-black">{T.CHAIN_INFO.DEFAULT_CHAIN_NAME}</div>
                  </div>
              }
              <div className="flex items-center justify-center h-10 pl-5 pr-5 rounded-btn-r border border-orange-100 bg-white">
                <div className="text-lg text-f-black">{T.formatAddress('0x8899B50613AB56F4D21ff5407d3f16AdF5fce884')}</div>
              </div>
            </div>
            :
            <BaseBtn
              btnText={T.Lan[currentLan].connect}
              handleClick={() => {
                setShowModal!(true)
                setShowWalletSelect!(true)
              }}
            />
        }


      </div>
    </div >
  )
}

export default Header