import { getHighestImpactIssue } from '../../common/utils';
import { IValue, IAuditStrategyOptions } from '../../common/interfaces';

const hasTransferFee = ({ key, issues, contract }: IAuditStrategyOptions) => {
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
			values.privileged.forEach((value: IValue) => {
				if (value?.modifiable === true) {
					modifiable = value?.modifiable;
				}
			});
		}

		if (values.modifiable) {
			modifiable = values.modifiable;
		}
		//---------------------

		// get transferFees
		//---------------------
		const buyerTranferFeeData = values.transferFee.find(
			(transferFee: { value: number; variable: string }) => {
				return (transferFee.variable = 'buyFee');
			},
		);
		const sellerTranferFeeData = values.transferFee.find(
			(transferFee: { value: number; variable: string }) => {
				return (transferFee.variable = 'sellerFee');
			},
		);
		//---------------------

		// Update values
		//---------------------
		values.transferFee = {
			buyer: buyerTranferFeeData.value,
			seller: sellerTranferFeeData.value,
		};

		value = values;
		//---------------------
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

export { hasTransferFee };
