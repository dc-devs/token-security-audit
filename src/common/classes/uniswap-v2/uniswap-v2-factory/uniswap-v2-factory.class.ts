import { ethers } from '../../ethers';
import { ethers as ethersJs } from 'ethers';
import { UniswapV2FactoryAbi } from '../../../abis/uniswap-v2';
import { UniswapV2Address } from '../../../enums/uniswap-v2-address.enum';

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
}

export { UniswapV2Factory };
