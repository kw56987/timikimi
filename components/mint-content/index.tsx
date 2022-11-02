import { FC, useContext, useEffect, useState, useRef, useCallback } from "react";
import Image from 'next/image'
import LogoPic from '../../public/assets/img/logo.png'
import BaseBtn from '../ui/base-btn'
import * as T from '../../utils'
import BaseCtx from '../../base-content'
import axios from "axios";
import { useWeb3 } from '@3rdweb/hooks'

interface Prop { }

const MintContent: FC<Prop> = () => {

  const { currentLan, setShowToast, setToastText, setToastType, setLoading, setShowModal, setShowNFT, setNftInfo, setShowWalletSelect } = useContext(BaseCtx)
  const [showVideo, setShowVideo] = useState(false)

  /* 1 not white list 
  *  2 in white list and activity not start
  *  3 mint
  *  4 mint ok show nft
  */
  const [btnStatus, setBtnStatus] = useState<1 | 2 | 3 | 4 | 5>(1)
  const [nftInfo, setNftInfns] = useState<any>(0)

  const [countdown, setCountdown] = useState<string>('d-h-m-s')
  const [amount, setAmount] = useState(0)
  const { address, chainId = 0 } = useWeb3()


  const handleShowToast = (key: string) => {
    const lan = T.Lan[currentLan]
    setShowToast!(true)
    setToastText!(lan[key])
    setToastType!('Info')

    const timer = setTimeout(() => {
      setShowToast!(false)
      clearTimeout(timer)
    }, 2000)
  }

  const getNft = useCallback(async () => {
    const tokensQuery = `
        query {
          users(where: {
            id: "${address!.toLowerCase()}"
            }, first: 5) {
          id
          tokens {
            id, name
          }
        }
      }
		`
    return await T.GraphQl.query(tokensQuery, {}).toPromise()
  }, [address])

  const isFirstRender = useRef(true);

  const countDown = (end: number) => {
    const timer = setInterval(() => {
      const now = new Date().getTime() / 1000
      if (now > end) {
        clearInterval(timer)
        setBtnStatus(3)
      }
      setCountdown(T.countDown(end))
    }, 1000)
  }

  const getTime = useCallback(() => {
    axios.get(`${T.HTTP_SERVER}events/lotteries/times`).then((v) => {
      console.log(v.data)
      const now = new Date().getTime() / 1000
      setLoading!(false)
      // countDown(v.data.end)
      countDown(now + 30)
    })
  }, [setLoading])

  // useEffect(() => {

  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }

  //   const findByAddress = () => {
  //     setLoading!(true)
  //     axios.get(`${T.HTTP_SERVER}events/lotteries/tickets/findByAddress?address=${address}`)
  //       .then((v) => {
  //         if (v.data.address) {
  //           getNft()
  //             .then((nft) => {
  //               if (nft.data.users.length) {
  //                 setBtnStatus(4)
  //                 setLoading!(false)
  //                 setNftInfns(nft.data.users[0].tokens[0].id)
  //               } else {
  //                 getTime()
  //                 setBtnStatus(2)
  //               }
  //             })
  //             .catch(() => {
  //               setLoading!(false)
  //               setBtnStatus(2)
  //             })
  //         } else {
  //           setLoading!(false)
  //           setBtnStatus(1)
  //         }
  //       })
  //       .catch((e) => {
  //         setLoading!(false)
  //         setBtnStatus(1)
  //       })
  //   }

  //   if (address) {
  //     findByAddress()
  //   }

  // }, [address, getTime, getNft, setLoading])

  return (
    <div className="mint-content relative">
      <div className="absolute inset-0 mint-mask blur"></div>
      <div className="relative z-10 flex items-center justify-center">
        <div className="mr-10">
          <div style={{ width: '303px', height: '540px', position: 'relative' }}>
            <video
              width="303"
              height="540"
              controls
              id="m-vidoe"
              loop
            >
              <source src={require('/public/assets/video/show.mp4')} />
              您的浏览器不支持 HTML5 video 标签。
            </video>
            {
              !showVideo
              &&
              <div
                className="flex items-center justify-center h-full nft-bg cursor-pointer absolute inset-0"
                onClick={() => {
                  setShowVideo(true)
                  const v = document.getElementById('m-vidoe') as HTMLVideoElement
                  v.play()
                }}
              >
                <Image src={T.PLAY_ICON_BASE64} width={40} height={40} alt=""></Image>
              </div>
            }

          </div>
        </div>
        <div className="flex-1">
          <Image
            alt="logo"
            src={LogoPic}
            width={128}
            height={35}
          />
          <div className="text-lg text-orange-100 leading-7">{T.Lan[currentLan].dec}</div>
          <div className="inline-block mt-24 flex justify-end">
            {
              btnStatus === 1
              &&
              <BaseBtn
                btnText={T.Lan[currentLan].get_white_list}
                handleClick={() => {
                  handleShowToast('come')
                  // if (!address) {
                  //   handleShowToast('wallet')
                  //   return
                  // }
                  // setLoading!(true)
                  // const L = new T.Login(address)
                  // L.login().then((r: any) => {
                  //   setLoading!(false)
                  //   if (r.status === 'success') {
                  //     handleShowToast('white_success')
                  //     getTime()
                  //     setBtnStatus(2)
                  //   } else {
                  //     handleShowToast('white_fail')
                  //   }
                  // })
                }}
              />
            }
            {
              btnStatus === 2
              &&
              <BaseBtn
                btnText={countdown + ' ' + T.Lan[currentLan].mint}
                handleClick={() => {
                  handleShowToast('act_not_start')
                }}
              />
            }
            {
              btnStatus === 3
              &&
              <BaseBtn
                btnText={T.Lan[currentLan].mint}
                handleClick={() => {
                  if (!address) {
                    handleShowToast('wallet')
                    return
                  }
                  setLoading!(true)
                  const C = new T.Claim(address, amount, chainId)

                  C.claim().then((r: any) => {
                    setLoading!(false)
                    if (r.status === 'success') {
                      handleShowToast(r.msg)
                      setBtnStatus(5)
                    } else {
                      handleShowToast(r.msg)
                    }
                  })
                }}
              />
            }
            {
              btnStatus === 4
              &&
              <BaseBtn
                btnText={T.Lan[currentLan].show}
                handleClick={() => {
                  if (!address) {
                    handleShowToast('wallet')
                    return
                  }
                  setShowModal!(true)
                  setShowNFT!(true)
                  setShowWalletSelect!(false)
                  setNftInfo!({ id: nftInfo })
                }}
              />
            }
          </div>
          {/* <input
            type="number"
            value={amount}
            style={{ border: '1px solid #333' }}
            onChange={(e) => {
              console.log(e.target.value)
              setAmount(+e.target.value)
            }}
          />
          <div>test amount & nonce</div> */}
        </div>
      </div>

    </div>
  )
}

export default MintContent