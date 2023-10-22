import { getHighestImpactIssue } from '../../common/utils';
import { IAuditStrategyOptions } from '../../common/interfaces';

const hasBlacklist = ({ key, issues, contract }: IAuditStrategyOptions) => {
	let modifiable = false;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	// contract[key] = {
	// 	result: true,
	// 	value: highestTransferFee,
	// 	impact: highestImpactIssue?.impact || null,
	// 	confidence: highestImpactIssue?.confidence || null,
	// 	modifiable,
	// 	deFiIssues: issues,
	// };
};

export { hasBlacklist };
