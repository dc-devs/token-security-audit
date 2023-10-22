import { IIssueGovernanceOwner } from './issue-governance-owner.interface';

interface IIssueGovernance {
	Owner: IIssueGovernanceOwner;
	worstOwner: IIssueGovernanceOwner;
}

export { IIssueGovernance };
