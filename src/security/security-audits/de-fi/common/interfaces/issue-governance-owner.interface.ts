interface IIssueGovernanceOwner {
	type: string;
	owner: string;
	timelockDelay: number | null;
}

export { IIssueGovernanceOwner };
