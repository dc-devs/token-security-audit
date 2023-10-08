import { getCommandLineArguments } from '../common/utils';
import { Security } from './security.class';

const cliArgs = getCommandLineArguments();
const { address } = cliArgs;
const security = new Security({ chainId: '1' });

await security.runGoPlusSecurityAudit({ address });
await security.runDeFiSecurityAudit({ address });

security.displayResults();
