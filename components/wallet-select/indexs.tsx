import { FC, useContext } from "react";
import Image from "next/image";
import metamaskPic from '../../public/assets/img/metamask-icon.png'
import BaseCtx from '../../base-content'
import { useWeb3 } from '@3rdweb/hooks'

type Prop = {}

const WalletSelect: FC<Prop> = ({ }) => {
  const { setShowModal, setShowWalletSelect } = useContext(BaseCtx)

  const { connectWallet } = useWeb3()

  return (
    <div className="w-wallet-select-w bg-custom-500 rounded-btn-r pt-8 pb-toast-t">
      <div className="text-4xl text-orange-100 text-center mb-toast-h">Connect</div>
      <div>
        <div
          className="pl-custom-w-100 pr-custom-w-100 flex items-center justify-start cursor-pointer hover:bg-custom-600 h-20"
          onClick={async () => {
            connectWallet('injected')
            localStorage.setItem('_is_connect', 'YES')
            setShowModal!(false)
            setShowWalletSelect!(false)
          }}
        >
          <Image
            src={metamaskPic}
            alt='metamask pic'
            width={40}
            height={40}
          />
          <div className="text-2xl text-orange-100 ml-5">MetaMask</div>
        </div>
      </div>
    </div>
  )
}

export default WalletSelect

