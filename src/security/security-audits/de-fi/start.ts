import { getCommandLineArguments } from '../../../common/utils';
import { runDeFiSecurityAudit } from './run-de-fi-security-audit';

(async () => {
	const { address, chainId } = getCommandLineArguments();
	const deFiSecurityAudit = await runDeFiSecurityAudit({ chainId, address });

	console.log(deFiSecurityAudit);
})();
