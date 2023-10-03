import { UniswapV2Factory } from './common/classes';

const startListening = async () => {
	const uniswapV2Factory = await new UniswapV2Factory().init();
	uniswapV2Factory.trackPairCreated();
};

try {
	startListening();
} catch (e) {
	console.error('Caught Errror: ', e);
}
