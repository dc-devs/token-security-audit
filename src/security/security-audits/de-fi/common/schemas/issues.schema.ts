const deFiIssuesSchema = {
	scwId: true,
	scwTitle: true,
	scwDescription: true,
	issues: {
		id: true,
		confidence: true,
		impact: true,
		description: true,
		start: true,
		end: true,
		data: true,
		severityChanges: {
			from: true,
			to: true,
			reason: true,
		},
		additionalData: {
			title: true,
			description: true,
		},
		governanceInfo: {
			owners: {
				type: true,
				owner: true,
				timelockDelay: true,
			},
			worstOwner: {
				type: true,
				owner: true,
				timelockDelay: true,
			},
		},
	},
};

export { deFiIssuesSchema };
