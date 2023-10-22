import { IIssueGovernanceOwner } from './issue-governance-owner.interface';

interface IIssueGovernance {
	owner?: IIssueGovernanceOwner;
	owners?: IIssueGovernanceOwner[];
	worstOwner: IIssueGovernanceOwner;
}

export { IIssueGovernance };
