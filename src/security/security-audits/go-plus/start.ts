import { getCommandLineArguments } from '../../../common/utils';
import { runGoPlusSecurityAudit } from './run-go-plus-security-audit';

const cliArgs = getCommandLineArguments();
const { address, chainId } = cliArgs;

const goPlusSecurityAudit = await runGoPlusSecurityAudit({ chainId, address });

console.log(goPlusSecurityAudit);
