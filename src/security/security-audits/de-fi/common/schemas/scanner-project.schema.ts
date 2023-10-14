import { diffsSchema } from './diffs.schema';
import { statsSchema } from './stats.schema';
import { deFiIssuesSchema } from './issues.schema';
import { scannerSchema } from './scanner.schema';
import { proxyDataSchema } from './proxy-data.schema';

const scannerProjectSchema = {
	...scannerSchema,
	coreIssues: { ...deFiIssuesSchema },
	generalIssues: { ...deFiIssuesSchema },
	stats: { ...statsSchema },
	proxyData: { ...proxyDataSchema },
	diffs: { ...diffsSchema },
};

export { scannerProjectSchema };
