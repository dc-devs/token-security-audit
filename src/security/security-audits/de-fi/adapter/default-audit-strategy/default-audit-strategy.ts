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

	// TODO:// Foundn out there are unamed issues?
	// One alerting us of a massive liquidity dump..
	// ^^ Seems post rug..
	// if (hasIssues && !key) {
	// 	console.log('key', key);

	// 	console.log(issues[0]);
	// }

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
