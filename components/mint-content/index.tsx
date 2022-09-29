import { FC, useContext, useEffect, useState } from "react";
import Image from 'next/image'
import LogoPic from '../../public/assets/img/logo.png'
import BaseBtn from '../ui/base-btn'
import * as T from '../../utils'
import BaseCtx from '../../base-content'
import axios from "axios";

interface Prop { }

const MintContent: FC<Prop> = () => {

  const { currentLan, setShowToast, setToastText, setToastType, currentAccount, setLoading, setShowModal, setShowNFT, setNftInfo } = useContext(BaseCtx)

  const [ticket, setTicket] = useState<{ statusCode: number, message: string }>({
    statusCode: 0,
    message: ''
  })

  const [activityTime, setActivityTime] = useState<{ start: number, end: number }>({
    start: 0,
    end: 0
  })

  const [countdown, setCountdown] = useState<string>('')
  const [amount, setAmount] = useState(0)

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

  const getNft = async () => {
    const tokensQuery = `
        query {
          users(where: {
            id: "${currentAccount}"
            }, first: 5) {
          id
          tokens {
            id, name
          }
        }
      }
		`
    return await T.GraphQl.query(tokensQuery, {}).toPromise()
  }

  useEffect(() => {
    const findByAddress = () => {
      axios.get(`${T.HTTP_SERVER}events/lotteries/tickets/findByAddress?address=${currentAccount}`).then((v) => {
        console.log(v.data)
        if (v.data.address) {
          setTicket({ message: 'OK', statusCode: 200 })
        } else {
          setTicket({ message: v.data.message, statusCode: v.data.statusCode })
        }
      })
    }

    const getTime = () => {
      axios.get(`${T.HTTP_SERVER}events/lotteries/times`).then((v) => {
        console.log(v.data)
        setActivityTime({
          start: v.data.start,
          end: v.data.end
        })
      })
    }

    const countDown = () => {
      const now = new Date().getTime() / 1000
      const timer = setInterval(() => {
        if (now > activityTime.end) {
          clearInterval(timer)
        }
        setCountdown(T.countDown(activityTime.end))
      }, 1000)
    }

    if (!ticket.message) {
      findByAddress()
    }
    if (!activityTime.start) {
      getTime()
    }

    countDown()
  }, [ticket.message, currentAccount, activityTime.start, activityTime.end])


  const getBtnStatus = (): string => {
    const now = new Date().getTime() / 1000
    if (now <= activityTime.end) {
      if (ticket.statusCode === 200) {
        return countdown + ' ' + T.Lan[currentLan].mint
      } else {
        return T.Lan[currentLan].get_white_list
      }
    } else {
      return T.Lan[currentLan].mint
    }
  }

  return (
    <div className="mint-content relative">
      <div className="absolute inset-0 mint-mask blur"></div>
      <div className="relative z-10 flex items-center justify-center">
        <div className="nft-bg mr-10"></div>
        <div className="flex-1">
          <Image
            alt="logo"
            src={LogoPic}
            width={128}
            height={35}
          />
          <div className="text-lg text-orange-100 leading-7">{T.Lan[currentLan].dec}</div>
          <div className="inline-block mt-24 flex justify-end">
            <BaseBtn
              btnText={getBtnStatus()}
              handleClick={async () => {
                if (!currentAccount) {
                  handleShowToast('wallet')
                } else {
                  setLoading!(true)
                  const nft = await getNft()
                  setLoading!(false)
                  if (nft.data.users.length) {
                    setShowModal!(true)
                    setShowNFT!(true)

                    setNftInfo!({ id: nft.data.users[0].tokens[0].id })
                    return
                  }
                  const now = new Date().getTime() / 1000
                  // time
                  if (now <= activityTime.end) {
                    if (ticket.statusCode !== 200) {
                      // login
                      setLoading!(true)
                      const L = new T.Login(currentAccount)
                      L.login().then((r: any) => {
                        setLoading!(false)
                        if (r.status === 'success') {
                          handleShowToast('white_success')
                        } else {
                          handleShowToast('white_fail')
                        }
                      })
                    } else {
                      // activity not start 
                      handleShowToast('act_not_start')
                    }

                  } else {
                    if (ticket.statusCode !== 200) {
                      // not hava ticket
                      handleShowToast('join_act')
                    } else {
                      // claim
                      setLoading!(true)
                      const C = new T.Claim(currentAccount, amount)

                      C.claim().then((r: any) => {
                        setLoading!(false)
                        console.log(r, 'ssss----,,,..')
                        if (r.status === 'success') {
                          handleShowToast('white_success')
                        } else {
                          handleShowToast('white_fail')
                        }
                      })
                    }
                  }
                }
              }}
            />
            
          </div>
          <BaseBtn
              btnText="test login"
              handleClick={() => {
                // login
                setLoading!(true)
                if (currentAccount) {
                  const L = new T.Login(currentAccount)
                  L.login().then((r: any) => {
                    setLoading!(false)
                    if (r.status === 'success') {
                      handleShowToast('white_success')
                    } else {
                      handleShowToast('white_fail')
                    }
                  })
                }
              }}
            />
            <BaseBtn
              btnText="test claim"
              handleClick={() => {
                setLoading!(true)
                if (currentAccount) {
                  const C = new T.Claim(currentAccount, amount)

                  C.claim().then((r: any) => {
                    setLoading!(false)
                    console.log(r, 'ssss----,,,..')
                    if (r.status === 'success') {
                      handleShowToast('white_success')
                    } else {
                      handleShowToast('white_fail')
                    }
                  })
                }
              }}
            />
            <input 
              type="number" 
              value={amount}
              style={{border: '1px solid #333'}}
              onChange={(e) => {
                console.log(e.target.value)
                setAmount(+e.target.value)
              }}
            />
            <div>test amount & nonce</div>
        </div>
      </div>

    </div>
  )
}

export default MintContent