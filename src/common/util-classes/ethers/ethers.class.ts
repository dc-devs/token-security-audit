import { ethers as ethersJs } from 'ethers';
import { config } from '../../../config';
import { IContractOptions } from './interfaces';

const { network, infuraProjectId, infuraProjectApiSecret } = config;

class Ethers {
	provider: ethersJs.AbstractProvider;
	constructor() {
		this.provider = new ethersJs.InfuraProvider(
			network,
			infuraProjectId,
			infuraProjectApiSecret,
		);
	}

	contract({ address, abi }: IContractOptions) {
		return new ethersJs.Contract(address, abi, this.provider);
	}
}

const ethers = new Ethers();

export { ethers };
