import { getCommandLineArguments } from '../common/utils';
import { Security } from './security.class';

const cliArgs = getCommandLineArguments();
const { address, chainId } = cliArgs;
const security = new Security({ chainId });

(async () => {
	await security.start({ address });
	security.displayResults();
})();

// HayToken (Scam)
// bun run securityAudit --address='0xfa3e941d1f6b7b10ed84a0c211bfa8aee907965e' --chainId='1'

// XBox (Scam)
// bun run securityAudit --address='0x47e4392036b9f5d9db985c76cf9428be0790e9e6' --chainId='1'

// KOMPETE (Safe?)
// bun run securityAudit --address='0x1e0b2992079b620aa13a7c2e7c88d2e1e18e46e9' --chainId='1'

// ILLUMIANTI (Safe?)
// bun run securityAudit --address='0x98e1f56b334438e3f0bde22d92f5bfd746e0631f' --chainId='1'

// MEDUSA SAFU
// bun run securityAudit --address='0x41Baa861237b7B429562bd2eEFa9C190c8E50DFb' --chainId='1'

// New Request "liquidityAnalysis":
// totalUnlockedPercent
// isAdequateLiquidityPresent": false,
// isEnoughLiquidityLocked": false,
// isCreatorNotContainLiquidity": true,
//
//
// New Request "honeyPot":
