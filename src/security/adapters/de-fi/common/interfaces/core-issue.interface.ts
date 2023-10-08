import { IIssue } from './issue.interface';

interface ICoreIssue {
	id: string; //scwId;
	title: null | string; //scwTitle;
	description: string; //scwDescription;
	issues: IIssue[];
}

export { ICoreIssue };
