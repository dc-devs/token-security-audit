import { IIssueSeverityChange } from './issue-serverity-change.interface';
import { IIssueAdditionalData } from './issue-additional-data.interface';
import { IIssueGovernance } from './issue-governance.interface';

interface IIssue {
	id: number;
	confidence: string;
	impact: string;
	description: string;
	start: number;
	end: number;
	snippet: string;
	severityChanges: IIssueSeverityChange;
	additionalData: IIssueAdditionalData;
	governanceInfo: IIssueGovernance;
}

export { IIssue };
