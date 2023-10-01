import { UniswapV2FactoryEvent } from './common/enums';
import {
	Reporter,
	UniswapV2Pair,
	UniswapV2Erc20,
	UniswapV2Factory,
} from './common/classes';

const startListening = async () => {
	const uniswapV2Factory = await new UniswapV2Factory().init();

	uniswapV2Factory.contract.on(
		UniswapV2FactoryEvent.PairCreated,
		async (token0Address, token1Address, pairAddress) => {
			try {
				// Fetch token details
				const token0 = await new UniswapV2Erc20({
					address: token0Address,
				}).init();

				const token1 = await new UniswapV2Erc20({
					address: token1Address,
				}).init();

				// Fetch pair details
				const uniswapV2Pair = await new UniswapV2Pair({
					address: pairAddress,
				}).init();

				// Fetch liquidity details
				const reserves = await uniswapV2Pair.contract.getReserves();
				const { reserve0, reserve1 } = reserves;

				// Log data to console
				const reporter = new Reporter();
				reporter.logTokenPair({
					token0,
					token1,
					reserve0,
					reserve1,
					pairAddress,
				});
			} catch (error) {
				console.error('Error processing PairCreated event:', error);
			}
		},
	);
};

try {
	startListening();
} catch (e) {
	console.error('Caught Errror: ', e);
}
