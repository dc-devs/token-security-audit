import { PubSubEvent } from '../../enums';
import { UniswapV2Erc20 } from '../../../token-pair-tracker/ethereum/uniswap-v2';

interface PubSubCallbacks {
	[PubSubEvent.NewTokenPairCreated]: ({
		token0,
		token1,
		reserve0,
		reserve1,
		pairAddress,
	}: {
		token0: UniswapV2Erc20;
		token1: UniswapV2Erc20;
		reserve0: string;
		reserve1: string;
		pairAddress: string;
	}) => void;
}

class PubSub {
	eventMap = {} as Record<PubSubEvent, Set<(...args: any[]) => void>>;

	on<K extends keyof PubSubCallbacks>(
		event: K,
		callback: PubSubCallbacks[K],
	) {
		if (!this.eventMap[event]) {
			// create a new set
			this.eventMap[event] = new Set();
		}

		this.eventMap[event].add(callback);
	}

	off<K extends keyof PubSubCallbacks>(
		event: K,
		callback: PubSubCallbacks[K],
	) {
		if (!this.eventMap[event]) {
			return;
		}

		this.eventMap[event].delete(callback);
	}

	emit<K extends keyof PubSubCallbacks>(
		event: K,
		...args: Parameters<PubSubCallbacks[K]>
	) {
		if (!this.eventMap[event]) {
			return;
		}

		this.eventMap[event].forEach((cb: any) => cb(...args));
	}
}

const pubSub = new PubSub();

export { PubSub, pubSub };
