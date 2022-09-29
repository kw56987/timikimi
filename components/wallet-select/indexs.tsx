import { FC, useContext } from "react";
import Image from "next/image";
import metamaskPic from '../../public/assets/img/metamask-icon.png'
import { useWallet, WalletType } from 'use-wallet-ethers'
import * as T from '../../utils'
import BaseCtx from '../../base-content'

const WalletSelect: FC = () => {
  const { setShowModal, setShowWalletSelect, setCurrentAccount, setCurrentChianId } = useContext(BaseCtx)

  const { init, provider } = useWallet(
    WalletType.Metamask,
    {
      id: +(T.CHAIN_INFO.DEFAULT_CHAIN_ID),
      name: T.CHAIN_INFO.DEFAULT_CHAIN_NAME,
      rpcs: [T.CHAIN_INFO.DEFAULT_CHAIN_RPC],
      icons: [],
      explorers: [],
      currency: {
        name: T.CHAIN_INFO.DEFAULT_CHAIN_COIN_NAME,
        symbol: T.CHAIN_INFO.DEFAULT_CHAIN_COIN_SYMBOL,
        decimals: T.CHAIN_INFO.DEFAULT_CHAIN_COIN_DECIMAL
      }
    },
    {
      onConnect: (chainId: string) => console.log(chainId, 111110000),
      onDisconnect: (error: T.RpcError) => console.log(error, ),
      onAccountsChanged: (accounts: string[]) => {
        if (accounts.length) {
          setCurrentAccount!(accounts[0])
          localStorage.setItem('_select_account', accounts[0])
        }
      },
      onChainChanged: (chainId: string) => {
        setCurrentChianId!(chainId)
        localStorage.setItem('_select_chain_id', chainId)
      },
    }
  );

  return (
    <div className="w-wallet-select-w bg-custom-500 rounded-btn-r pt-8 pb-toast-t">
      <div className="text-4xl text-orange-100 text-center mb-toast-h">Connect</div>
      <div>
        <div 
          className="pl-custom-w-100 pr-custom-w-100 flex items-center justify-start cursor-pointer hover:bg-custom-600 h-20"
          onClick={() => {
            init().then(() => {
              setShowModal!(false)
              setShowWalletSelect!(false)
            })
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

