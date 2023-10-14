import { getCommandLineArguments } from '../common/utils';
import { Security } from './security.class';

const cliArgs = getCommandLineArguments();
const { address, chainId } = cliArgs;
const security = new Security({ chainId });

await security.start({ address });

security.displayResults();

// HayToken
// bun run securityAudit --address='0xfa3e941d1f6b7b10ed84a0c211bfa8aee907965e' --chainId='1'

// XBox
// bun run securityAudit --address='0x47e4392036b9f5d9db985c76cf9428be0790e9e6' --chainId='1'
