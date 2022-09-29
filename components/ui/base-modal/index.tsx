import { FC, ReactNode, useContext } from "react";
import Image from "next/image";
import closePic from '../../../public/assets/img/close.png'
import BaseCtx from '../../../base-content'

interface Prop {
  children: ReactNode
}

const BaseModal: FC<Prop> = ({ children }) => {

  const { setShowModal } = useContext(BaseCtx)

  return (
    <div className="w-screen h-screen bg-black bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
      <div className="relative">
        <div 
          className="absolute top-8 right-8 cursor-pointer"
          onClick={() => {
            setShowModal!(false)
          }}
        >
          <Image
            src={closePic}
            width={24}
            height={24}
            alt={'close btn'}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default BaseModal