import { FC, ReactNode } from "react";
import Image from "next/image";
import infoPic from '../../../public/assets/img/info.png'
import warnPic from '../../../public/assets/img/warn.png'

interface Prop {
  text: string,
  type: 'Warn' | 'Info'
}

const BaseToast: FC<Prop> = ({ text, type }) => {

  return (
    <div className="w-screen fixed flex justify-center left-0 top-toast-t z-50">
      {
        type === 'Info'
        &&
        <div className="flex items-center justify-center bg-custom-100 pl-8 pr-8 rounded-toast-r border border-custom-200 h-toast-h">
          <Image
            src={infoPic}
            alt='toast icon'
            width={40}
            height={40}
          />
          <div className="ml-8 text-2xl text-f-black">{text}</div>
        </div>
      }
      {
        type === 'Warn'
        &&
        <div className="flex items-center justify-center bg-custom-300 pl-8 pr-8 rounded-toast-r border border-custom-400 h-toast-h">
          <Image
            src={warnPic}
            alt='toast icon'
            width={40}
            height={40}
          />
          <div className="ml-8 text-2xl text-f-black">{text}</div>
        </div>
      }
    </div>
  )
}

export default BaseToast

