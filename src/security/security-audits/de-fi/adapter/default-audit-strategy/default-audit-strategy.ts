import { getHighestImpactIssue } from '../../common/utils';
import { IAuditStrategyOptions } from '../../common/interfaces';

const defaultAuditStrategy = ({
	key,
	issues,
	contract,
}: IAuditStrategyOptions) => {
	const hasIssues = issues.length > 0;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	contract[key] = {
		result: hasIssues,
		value: null,
		impact: highestImpactIssue?.impact || null,
		confidence: highestImpactIssue?.confidence || null,
		modifiable: null,
		deFiIssues: issues,
	};
};

export { defaultAuditStrategy };
