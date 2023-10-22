import { IIssue } from './issue.interface';
import { IContract } from '../../../../common/interfaces';

interface ICustomDataStrategyOptions {
	key: string;
	issues: IIssue[];
	contract: IContract;
}

export { ICustomDataStrategyOptions };
