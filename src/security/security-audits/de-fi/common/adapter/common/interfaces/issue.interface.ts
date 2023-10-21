import { IIssueSeverityChange } from './issue-serverity-change.interface';
import { IIssueAdditionalData } from './issue-additional-data.interface';
import { IIssueGovernance } from './issue-governance.interface';
import { Impact, Confidence } from '../enums';

interface IIssue {
	id: number;
	confidence: Confidence;
	impact: Impact;
	description: string;
	start: number;
	end: number;
	data: string;
	snippet?: string;
	severityChanges: IIssueSeverityChange[];
	additionalData: IIssueAdditionalData[];
	governanceInfo: IIssueGovernance | null;
}

export { IIssue };
