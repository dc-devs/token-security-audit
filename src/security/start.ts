import { getCommandLineArguments } from '../common/utils';
import { Security } from './security.class';

const cliArgs = getCommandLineArguments();
const { address } = cliArgs;
const security = new Security({ chainId: '1' });

await security.start({ address });

security.displayResults();
