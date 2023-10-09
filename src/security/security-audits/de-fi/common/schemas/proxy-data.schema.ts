const proxyDataSchema = {
	proxyOwner: true,
	sourceCodeLink: true,
	proxyIssues: {
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
	},
	implementationData: {
		firstTxFrom: true,
		firstTxDate: true,
		firstTxBlock: true,
		name: true,
		initialFunder: true,
		initialFunding: true,
	},
};

export { proxyDataSchema };
