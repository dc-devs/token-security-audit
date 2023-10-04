import { ethers } from '../../common/classes/ethers';
import { ethers as ethersJs } from 'ethers';
import { UniswapV2Erc20Abi } from '../../common/abis/uniswap-v2';

interface IConstructorOptions {
	address: string;
}

class UniswapV2Erc20 {
	abi: string[];
	address: string;
	name?: string;
	symbol?: string;
	contract: ethersJs.Contract;

	constructor({ address }: IConstructorOptions) {
		const abi = UniswapV2Erc20Abi;

		this.abi = abi;

		this.address = address;

		this.contract = ethers.contract({
			abi,
			address,
		});

		return this;
	}

	async init() {
		this.name = await this.contract.name();
		this.symbol = await this.contract.symbol();

		return this;
	}
}

export { UniswapV2Erc20 };
