import { IIssue } from './issue.interface';
import { IContract } from '../../../../common/interfaces';

interface ICustomAuditStrategiesOptions {
	[key: string]: ({
		key,
		issues,
		contract,
	}: {
		key: string;
		issues: IIssue[];
		contract: IContract;
	}) => void;
}

export { ICustomAuditStrategiesOptions };
