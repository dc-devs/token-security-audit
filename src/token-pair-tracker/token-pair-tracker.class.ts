import { UniswapV2Factory } from './ethereum/uniswap-v2';

class TokenPairTracker {
	start() {
		const uniswapV2Factory = new UniswapV2Factory();
		uniswapV2Factory.trackPairCreated();
	}
}

export { TokenPairTracker };
