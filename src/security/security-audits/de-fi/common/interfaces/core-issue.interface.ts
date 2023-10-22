import { IIssue } from './issue.interface';

interface ICoreIssue {
	scwTitle: string;
	scwId: string;
	scwDescription: string;
	issues: IIssue[];
}

export { ICoreIssue };
