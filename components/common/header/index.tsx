import { FC, useContext } from "react";
import Image from 'next/image'
import LogoPic from '../../../public/assets/img/logo.png'
import TwitterPic from '../../../public/assets/img/twitter.png'
import DiscordPic from '../../../public/assets/img/discord.png'
import BaseBtn from '../../ui/base-btn'
import BaseCtx from '../../../base-content'

interface Prop { }

const Header: FC<Prop> = () => {

  const { setCurrentLan, currentLan } = useContext(BaseCtx)

  return (
    <div className="h-nav bg-nav-bg flex items-center justify-between pl-nav-p pr-nav-p">
      <Image
        alt="logo"
        src={LogoPic}
        width={128}
        height={35}
      />
      <div className="flex items-center justify-end">
        <div>
          <Image
            alt="twitter"
            src={TwitterPic}
            width={32}
            height={32}
          />
        </div>
        <div className='ml-12 mr-12'>
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
        <BaseBtn
          btnText="Connect"
          handleClick={() => { }}
        />
      </div>
    </div >
  )
}

export default Header

