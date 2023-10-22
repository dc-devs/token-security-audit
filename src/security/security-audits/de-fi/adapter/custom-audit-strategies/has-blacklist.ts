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
		const values = JSON.parse(highestImpactIssue?.data)
			.privileged as IValue[];

		value = values;

		values.forEach((value) => {
			if (value?.modifiable === true) {
				modifiable = value?.modifiable;
			}
		});
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
	} else {
		contract[key] = {
			result: false,
			value: null,
			impact: null,
			confidence: null,
			modifiable: null,
			deFiIssues: issues,
		};
	}
};

export { hasBlacklist };
