import { IIssue } from './issue.interface';
import { IContract } from '../../../../common/interfaces';

interface ICustomDataStrategiesOptions {
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

export { ICustomDataStrategiesOptions };
