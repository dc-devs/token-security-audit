import { getCommandLineArguments } from '../common/utils';
import { Security } from './security.class';

const cliArgs = getCommandLineArguments();
const { address, chainId } = cliArgs;
const security = new Security({ chainId });

await security.start({ address });

// security.displayResults();
