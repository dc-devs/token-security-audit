import { IIssue } from '.';
import { IContract } from '../../../../common/interfaces';

interface ICustomizeDataStrategyOptions {
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

export { ICustomizeDataStrategyOptions };
