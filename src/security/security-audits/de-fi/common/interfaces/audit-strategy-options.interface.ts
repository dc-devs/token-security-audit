import { IIssue } from './issue.interface';
import { IContract } from '../../../../common/interfaces';

interface IAuditStrategyOptions {
	key: string;
	issues: IIssue[];
	contract: IContract;
}

export { IAuditStrategyOptions };
