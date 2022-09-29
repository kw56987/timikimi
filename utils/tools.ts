import { ExternalProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import { createClient } from 'urql'
import { GRAPH_QL_SERVER } from './constant'

export const formatAddress = (address: string): string => {
	const str_1 = address.substring(0, 5)
	const str_2 = address.substring(address.length - 4)
	return `${str_1}......${str_2}`
}

export const getSigner = async () => {
	const p = (await detectEthereumProvider()) as ExternalProvider
	const provider = new ethers.providers.Web3Provider(p)
	const signer = provider.getSigner() as any

	return signer
}

export const countDown = (endtime: number) => {
	let nowtime = new Date()
	let lefttime = endtime * 1000 - nowtime.getTime(),
		d = Math.floor(lefttime / (1000 * 60 * 60 * 24)),
		h = Math.floor((lefttime / (1000 * 60 * 60)) % 24),
		m = Math.floor((lefttime / (1000 * 60)) % 60),
		s = Math.floor((lefttime / 1000) % 60)

	return d + 'd ' + h + ':' + m + ':' + s
}

export const GraphQl = createClient({
  url: GRAPH_QL_SERVER,
})