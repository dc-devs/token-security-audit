import { ethers as ethersJs } from 'ethers';
import { ethers } from '../../common/util-classes/ethers';
interface IConstructorOptions {
	address: string;
}

class Wallet {
	address: string;
	contract: ethersJs.Contract;

	constructor({ address }: IConstructorOptions) {
		this.address = address;
	}
}

export { Wallet };
