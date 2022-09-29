import { FC, useContext } from "react";
import Image from 'next/image'
import MetaPic from '../../public/assets/img/meta.png'
import BaseCtx from '../../base-content'
import * as T from '../../utils'

interface Prop {
  id?: string
}

const NftContent: FC<Prop> = ({id}) => {

  const { currentLan } = useContext(BaseCtx)

  return (
    <div className="nft-content flex justify-start items-center">
      <div className="nft-img flex-shrink-0">
        <Image
          alt="logo"
          src={MetaPic}
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className="flex-1">
        <div className="text-4xl text-orange-100 mb-2.5">{T.Lan[currentLan].nft} #{id}</div>
        <div className="text-lg text-orange-100 mb-5">{T.Lan[currentLan].dec}</div>
        <div className="flex content-start flex-wrap">
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">BACKGROUND</div>
            <div className="text-black text-sm">Dark Grey</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">CLOTHES</div>
            <div className="text-black text-sm">White</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">EYES</div>
            <div className="text-black text-sm">Hypnotized</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">FUR</div>
            <div className="text-black text-sm">Flower</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">HANDS</div>
            <div className="text-black text-sm">Hamburger</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">HATS</div>
            <div className="text-black text-sm">Hamburger</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">MOUTH</div>
            <div className="text-black text-sm">Phoneme U</div>
          </div>
          <div className="w-tag-w h-tag-h bg-tag-bg rounded-lg border border-orange-100 flex justify-center items-center flex-col mr-4 mb-4">
            <div className="text-orange-100 text-xs">PANTS</div>
            <div className="text-black text-sm">Trousers Browm</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NftContent