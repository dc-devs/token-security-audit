import { ethers } from '../../ethers';
import { ethers as ethersJs } from 'ethers';
import { UniswapV2PairAbi } from '../../../abis/uniswap-v2';

interface IConstructorOptions {
	address: string;
}

class UniswapV2Pair {
	abi: string[];
	address: string;
	contract: ethersJs.Contract;

	constructor({ address }: IConstructorOptions) {
		const abi = UniswapV2PairAbi;

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
}

export { UniswapV2Pair };
