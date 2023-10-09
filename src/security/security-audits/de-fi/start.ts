import { getCommandLineArguments } from '../../../common/utils';
import { runDeFiSecurityAudit } from './run-de-fi-security-audit';

const { address, chainId } = getCommandLineArguments();
const deFiSecurityAudit = await runDeFiSecurityAudit({ chainId, address });

console.log(deFiSecurityAudit);
