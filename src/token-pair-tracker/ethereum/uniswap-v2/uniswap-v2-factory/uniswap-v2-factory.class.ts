import { ethers as ethersJs } from 'ethers';
import { UniswapV2Pair } from '../uniswap-v2-pair';
import { UniswapV2Erc20 } from '../uniswap-v2-erc-20';
import { ethers, pubSub } from '../../../../common/util-classes';
import { PubSubEvent } from '../../../../common/enums';
import { UniswapV2FactoryAbi } from '../../../../common/abis/uniswap-v2';
import {
	UniswapV2Address,
	UniswapV2FactoryEvent,
} from '../../../../common/enums';

class UniswapV2Factory {
	abi: any[];
	address: string;
	contract: ethersJs.Contract;

	constructor() {
		const abi = UniswapV2FactoryAbi;
		const address = UniswapV2Address.Factory;

		this.abi = abi;
		this.address = address;
		this.contract = ethers.contract({
			abi,
			address,
		});

		return this;
	}

	async init() {
		return this;
	}

	trackPairCreated() {
		this.contract.on(
			UniswapV2FactoryEvent.PairCreated,
			async (
				token0AddressUpperCase,
				token1AddressUpperCase,
				pairAddressUpperCase,
			) => {
				const pairAddress = pairAddressUpperCase.toLowerCase();
				const token0Address = token0AddressUpperCase.toLowerCase();
				const token1Address = token1AddressUpperCase.toLowerCase();

				// console.log('Pair Created:');
				// console.log(token0Address, token1Address, pairAddress);

				// Fetch token details
				const token0 = await new UniswapV2Erc20({
					address: token0Address,
				}).init();
				// console.log(token0);

				const token1 = await new UniswapV2Erc20({
					address: token1Address,
				}).init();
				// console.log(token1);

				// Fetch pair details
				const uniswapV2Pair = await new UniswapV2Pair({
					address: pairAddress,
				}).init();

				// Fetch liquidity details
				const reserves = await uniswapV2Pair.contract.getReserves();
				const { reserve0, reserve1 } = reserves;

				pubSub.emit(PubSubEvent.NewTokenPairCreated, {
					token0,
					token1,
					reserve0,
					reserve1,
					pairAddress,
				});
			},
		);
	}
}

export { UniswapV2Factory };
