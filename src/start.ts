import { Security } from './security';
import { Reporter } from './reporter ';
import { PubSubEvent } from './common/enums';
import { pubSub } from './common/util-classes';
import { TokenPairTracker } from './token-pair-tracker';

const reporter = new Reporter();
const tokenPairTracker = new TokenPairTracker();

tokenPairTracker.start();

pubSub.on(
	PubSubEvent.NewTokenPairCreated,
	({ token0, token1, reserve0, reserve1, pairAddress }) => {
		reporter.logTokenPair({
			token0,
			token1,
			reserve0,
			reserve1,
			pairAddress,
		});
	},
);

// security results
// const security = new Security({
// 	chainId: '1',
// });
// await security.runGoPlusSecurityAudit({
// 	address: token0Address,
// });
// await security.runGoPlusSecurityAudit({
// 	address: token1Address,
// });
// security.displayResults();
