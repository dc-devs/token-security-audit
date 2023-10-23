import { getHighestImpactIssue } from '../../common/utils';
import { IValue, IAuditStrategyOptions } from '../../common/interfaces';

const hasTransferLimit = ({ key, issues, contract }: IAuditStrategyOptions) => {
	let value: IValue[] | null = null;
	let modifiable = false;
	const hasIssues = issues.length > 0;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	if (highestImpactIssue) {
		const values = JSON.parse(highestImpactIssue?.data);

		// getIsModifiable
		//---------------------
		if (values?.privileged) {
			values?.privileged.forEach((value: IValue) => {
				if (value?.modifiable === true) {
					modifiable = value?.modifiable;
				}
			});
		}

		if (values?.modifiable) {
			modifiable = values.modifiable;
		}
		//---------------------

		// Update values
		//---------------------
		value = values?.transferAmountLimits;
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

export { hasTransferLimit };

// Get Transfer Fees
// let highestUpperTransferLimit = 0;
// let highestLowerTransferLimit = 0;
// const highestImpactIssue = getHighestImpactIssue({
// 	issues,
// });

// const transferLimitDatas = issues.map((issue) => {
// 	return JSON.parse(issue.data);
// });

// transferLimitDatas.forEach((transferLimitData) => {
// 	const upperTransferLimit =
// 		transferLimitData?.transferAmountLimits?.upper;
// 	const lowerTransferLimit =
// 		transferLimitData?.transferAmountLimits?.lower;

// 	if (
// 		upperTransferLimit &&
// 		upperTransferLimit > highestUpperTransferLimit
// 	) {
// 		highestUpperTransferLimit = upperTransferLimit;
// 	}

// 	if (
// 		lowerTransferLimit &&
// 		lowerTransferLimit > highestLowerTransferLimit
// 	) {
// 		highestLowerTransferLimit = lowerTransferLimit;
// 	}
// });
