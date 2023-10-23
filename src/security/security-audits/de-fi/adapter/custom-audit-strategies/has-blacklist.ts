import { getHighestImpactIssue } from '../../common/utils';
import { IValue, IAuditStrategyOptions } from '../../common/interfaces';

const hasBlacklist = ({ key, issues, contract }: IAuditStrategyOptions) => {
	let value: IValue[] | null = null;
	let modifiable = false;
	const hasIssues = issues.length > 0;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	if (highestImpactIssue) {
		const values = JSON.parse(highestImpactIssue?.data);

		// getIsModifiable
		if (values?.privileged) {
			values.privileged.forEach((value: IValue) => {
				if (value?.modifiable === true) {
					modifiable = value?.modifiable;
				}
			});
		}

		value = values;
	}

	if (hasIssues) {
		contract[key] = {
			result: true,
			value,
			impact: highestImpactIssue?.impact || null,
			confidence: highestImpactIssue?.confidence || null,
			modifiable,
			deFiIssues: issues,
		};
	}
};

export { hasBlacklist };
