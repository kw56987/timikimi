import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import BaseCtx from '../base-content'
import Base from '../components/base'
import * as T from '../utils'
import Header from '../components/common/header'

const Home: NextPage = () => {
  const [currentLan, setCurrentLan] = useState<'JP' | 'EN'>('JP')

  useEffect(() => {
    const storageLan = localStorage.getItem('_current_lan') as 'JP' | 'EN'
    if (storageLan) {
      setCurrentLan(storageLan)
    }
  }, [])

  return (
    <BaseCtx.Provider value={{ currentLan, setCurrentLan }}>
      <Base
        tdk={{ title: 'Timikimi | Home page' }}
      >
        <Header />
        <div className='text-blue text-2xl'>{T.Lan[currentLan].hello}</div>
      </Base>
    </BaseCtx.Provider >
  )
}

export default Home
