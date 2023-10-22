import { getHighestImpactIssue } from '../../common/utils';
import { ICustomizeDataStrategyOptions } from '../../common/interfaces';

const hasTransferFee = ({
	key,
	issues,
	contract,
}: ICustomizeDataStrategyOptions) => {
	// Get Transfer Fees
	let highestTransferFee = 0;
	let modifiable = false;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	const transferFeeDatas = issues.map((issue) => {
		return JSON.parse(issue.data);
	});

	transferFeeDatas.forEach((transferFeeData) => {
		const transferFees = transferFeeData?.transferFee;
		const isModifiable = transferFeeData?.modifiable;

		if (Array.isArray(transferFees)) {
			transferFees.forEach((transferFee: any) => {
				const currentTransferFee = transferFee?.value;

				if (currentTransferFee > highestTransferFee) {
					highestTransferFee = currentTransferFee;
				}
			});
		}

		if (isModifiable) {
			modifiable = isModifiable;
		}
	});

	contract[key] = {
		result: true,
		value: highestTransferFee,
		impact: highestImpactIssue?.impact || null,
		confidence: highestImpactIssue?.confidence || null,
		modifiable,
		deFiIssues: issues,
	};
};

export { hasTransferFee };
