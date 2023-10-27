import { Security } from './security';
import { Reporter } from './reporter';
import { PubSubEvent } from './common/enums';
import { pubSub } from './common/util-classes';
import { selectNewToken } from './common/utils';
import { TokenPairTracker } from './token-pair-tracker';

const reporter = new Reporter();
const tokenPairTracker = new TokenPairTracker();

// emits: PubSubEvent.NewTokenPairCreated
tokenPairTracker.start();

pubSub.on(
	PubSubEvent.NewTokenPairCreated,
	async ({ token0, token1, reserve0, reserve1, pairAddress }) => {
		reporter.logTokenPair({
			token0,
			token1,
			reserve0,
			reserve1,
			pairAddress,
		});

		// security results
		const security = new Security({
			chainId: '1',
		});

		// TODO: check that one token is weth
		const newToken = selectNewToken({ token0, token1 });

		await security.start({
			address: newToken.address,
		});

		security.displayResults();
	},
);
