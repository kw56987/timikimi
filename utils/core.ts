import {
	ChainId,
	getEIP712LoginData,
	signEIP712LoginData,
	EIP712LoginData,
	getEIP712NftClaimData,
	EIP712NftClaimData,
	CreatureContract
} from '@volare.finance/utils.js'
import * as T from '../utils'
import axios from 'axios'

class Login {
	signer: any
	account: string
	loginData!: EIP712LoginData
	nonce: number = 0
	signature: string = ''

	constructor(account: string) {
		this.account = account
	}

	async getNonce() {
		return await axios.get(
			`${T.HTTP_SERVER}events/lotteries/tickets/nonce?address=${this.account}`
		)
	}

	getLoginData() {
		return getEIP712LoginData(
			{
				chainId: ChainId.Mumbai,
				name: 'Creature'
			},
			{
				address: this.account,
				nonce: this.nonce
			}
		)
	}

	async signLoginData() {
		const signer = await T.getSigner()
		return new Promise(async resolve => {
			try {
				const [, signature] = await signEIP712LoginData(signer, this.loginData)
				// add ticket
				this.addTicket(signature).then(({ data }) => {
					resolve({ status: 'success', msg: data })
				})
			} catch (error) {
				resolve({ status: 'fail', msg: 'fail' })
			}
		})
	}

	async addTicket(signature: string) {
		const params = { data: { ...this.loginData }, signature }
		console.log(params)
		return axios.post(`${T.HTTP_SERVER}events/lotteries/tickets`, params)
	}

	async login() {
		// get nonce
		const { data } = await this.getNonce()
		this.nonce = data
		// get login data
		this.loginData = this.getLoginData()
		// sign login data
		const res = await this.signLoginData()
		return res
	}
}

class Claim {
	account: string
	nonce: number = 0
	claimData!: EIP712NftClaimData
	chianId: number = 0

	constructor(account: string, nonce: number, chainId: number) {
		this.account = account,
		this.nonce = nonce,
		this.chianId = chainId
	}

	getClaimData() {
		return getEIP712NftClaimData(
			{
				chainId: this.chianId,
				name: 'Creature',
				verifyingContract: T.CONTRACT_ADDRESS
			},
			{
				recipient: this.account,
				amount: this.nonce,
				nonce: this.nonce
			}
		)
	}

	async signClaimData() {
		const signer = await T.getSigner()
		console.log(T.DEFAULT_CHAIN[this.chianId].rpcUrls[0])
		return new Promise(async resolve => {
			try {
				const creature = new CreatureContract(
					T.DEFAULT_CHAIN[this.chianId].rpcUrls[0],
					T.CONTRACT_ADDRESS
				)
				const r = await axios.post(`${T.HTTP_SERVER}eth/nft/claims/sign`, {
					name: this.claimData.domain.name,
					version: this.claimData.domain.version,
					chainId: this.claimData.domain.chainId,
					verifyingContract: this.claimData.domain.verifyingContract,
					recipient: this.claimData.message.recipient,
					nonce: this.nonce
				})
				try {
					const a = await creature.claim(
						signer,
						this.account,
						this.nonce,
						this.nonce,
						r.data.signature
					)
					resolve({ status: 'success', msg: 'mint_ok' })
				} catch (error) {
					resolve({ status: 'fail', msg: 'chance' })
				}
			} catch (error) {
				resolve({ status: 'fail', msg: 'not_whitelist' })
			}
		})
	}

	async claim() {
		// get claim data
		this.claimData = this.getClaimData()
		// claim sign
		const res = await this.signClaimData()
		return res
	}
}

export { Login, Claim }
