import { FC, ReactNode } from "react";
import Head from 'next/head';
import * as T from '../../utils'

interface Prop {
  tdk: T.TDK,
  children: ReactNode
}

const Base: FC<Prop> = ({ tdk, children }) => {

  return (
    <div>
      <Head>
        <title>{tdk.title || T.DEFAULT_TITLE}</title>
        <meta name="keywords" content={tdk.keywords || T.DEFAULT_KEYWORD} />
        <meta name="description" content={tdk.description || T.DEFAULT_DEC} />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="main">
        {children}
      </div>
    </div>
  )
}

export default Base