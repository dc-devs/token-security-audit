import { getHighestImpactIssue } from '../../common/utils';
import { ICustomizeDataStrategyOptions } from '../../common/interfaces';

const customDataStrategies: ICustomizeDataStrategyOptions = {
	hasTransferLimit: ({ key, issues, contract }) => {
		// Get Transfer Fees
		let highestUpperTransferLimit = 0;
		let highestLowerTransferLimit = 0;
		const highestImpactIssue = getHighestImpactIssue({
			issues,
		});

		const transferLimitDatas = issues.map((issue) => {
			return JSON.parse(issue.data);
		});

		transferLimitDatas.forEach((transferLimitData) => {
			const upperTransferLimit =
				transferLimitData?.transferAmountLimits?.upper;
			const lowerTransferLimit =
				transferLimitData?.transferAmountLimits?.lower;

			if (
				upperTransferLimit &&
				upperTransferLimit > highestUpperTransferLimit
			) {
				highestUpperTransferLimit = upperTransferLimit;
			}

			if (
				lowerTransferLimit &&
				lowerTransferLimit > highestLowerTransferLimit
			) {
				highestLowerTransferLimit = lowerTransferLimit;
			}
		});

		contract[key] = {
			result: true,
			value: {
				upper: highestUpperTransferLimit,
				lower: highestLowerTransferLimit,
				// Calc Percent with total supply
			},
			impact: highestImpactIssue?.impact || null,
			confidence: highestImpactIssue?.confidence || null,
			modifiable: null,
			deFiIssues: issues,
		};
	},
	hasVerifiedSourceCode: ({ key, issues, contract }) => {
		const highestImpactIssue = getHighestImpactIssue({
			issues,
		});

		contract[key] = {
			impact: highestImpactIssue?.impact || null,
			confidence: highestImpactIssue?.confidence || null,
			result: issues.length === 0,
			value: null,
			modifiable: null,
			deFiIssues: issues,
		};
	},
};

export { customDataStrategies };
