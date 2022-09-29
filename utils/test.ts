/**
 * @file opensea.ts
 * @author astra <astra@volare.com>
 * @date 2022
 */

 import { providers, Wallet } from 'ethers';

 import {
   getEIP712NftClaimData,
   signEIP712NftClaimData,
   eip712RecoverAddress,
   CreatureContract,
 } from '@volare.finance/utils.js';
 
 const DEPLOYER_PRIVATE_KEY = String('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');
 const ENDPOINT = 'http://127.0.0.1:8545/';
 const CHAIN_ID = 31337;
 const NAME = 'Creature';
 const CREATURE = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE';
 
 (async () => {
   const wallet = new Wallet(DEPLOYER_PRIVATE_KEY, new providers.JsonRpcProvider(ENDPOINT));
   console.log(wallet.address);
 
   const claim = getEIP712NftClaimData({
     chainId: CHAIN_ID,
     name: NAME,
     verifyingContract: CREATURE,
   }, {
     recipient: wallet.address,
     amount: 10,
     nonce: 0xaa,
   });
   console.log(claim);
 
   const [claimSig, claimSigBytes] = await signEIP712NftClaimData(wallet, claim);
   console.log(claimSig);
   console.log(claimSigBytes);
 
   const claimAddress = eip712RecoverAddress(claim, claimSig);
   console.log(claimAddress);
 
   const creature = new CreatureContract(ENDPOINT, CREATURE);
   console.log(await creature.name());
   console.log(await creature.symbol());
   console.log(await creature.tokenURI(1));
   console.log(await creature.balanceOf(wallet.address));
   console.log(await creature.ownerOf(1));
   console.log(
     await creature.claim(
       wallet,
       wallet.address,
       10,
       0xaa,
       claimSigBytes,
     ),
   );
 })();
 