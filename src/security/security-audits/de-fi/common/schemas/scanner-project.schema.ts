import { diffsSchema } from './diffs.schema';
import { statsSchema } from './stats.schema';
import { issuesSchema } from './issues.schema';
import { scannerSchema } from './scanner.schema';
import { proxyDataSchema } from './proxy-data.schema';

const scannerProjectSchema = {
	...scannerSchema,
	coreIssues: { ...issuesSchema },
	generalIssues: { ...issuesSchema },
	stats: { ...statsSchema },
	proxyData: { ...proxyDataSchema },
	diffs: { ...diffsSchema },
};

export { scannerProjectSchema };
