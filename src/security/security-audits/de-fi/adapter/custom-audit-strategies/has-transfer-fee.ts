import { getHighestImpactIssue } from '../../common/utils';
import { IValue, IAuditStrategyOptions } from '../../common/interfaces';
import { Impact } from '../../common/enums';

// TODO: Review This could be suss..
// Assuming if transferFee is non modifiable,
// in most cases it is OK
const getImpact = ({
	defiImpact,
	modifiable,
}: {
	modifiable: boolean | null;
	defiImpact: Impact;
}) => {
	let customImpact: Impact | null = Impact.Informational;

	if (modifiable === false) {
		customImpact = Impact.Medium;
	} else {
		customImpact = defiImpact || null;
	}

	return customImpact;
};

const getIsModifiable = ({ issueData }: { issueData: any }) => {
	let isModifiable: boolean | null = null;

	if (issueData?.privileged) {
		issueData.privileged.forEach((value: IValue) => {
			if (value?.modifiable === true) {
				isModifiable = value?.modifiable;
			}
		});
	}

	return isModifiable;
};

const getTransferFees = ({ issueData }: { issueData: any }) => {
	let transferFee: Record<string, unknown> = {};
	const transferFeeArrayCopy = [...issueData?.transferFee];

	if (transferFeeArrayCopy?.find) {
		const buyerTranferFeeData = transferFeeArrayCopy?.find(
			(transferFee: { value: number; variable: string }) => {
				return transferFee.variable === 'buyFee';
			},
		);

		if (buyerTranferFeeData) {
			transferFee.buyer = buyerTranferFeeData.value;
		}

		const sellerTranferFeeData = transferFeeArrayCopy?.find(
			(transferFee: { value: number; variable: string }) => {
				return transferFee.variable === 'sellFee';
			},
		);

		if (sellerTranferFeeData) {
			transferFee.seller = sellerTranferFeeData.value;
		}
	}

	return transferFee;
};

interface ICustomValue {
	[key: string]: Record<string, unknown>;
}

const hasTransferFee = ({ key, issues, contract }: IAuditStrategyOptions) => {
	let customValue: ICustomValue = {};
	let impact: Impact = Impact.Informational;
	let modifiable: boolean = false;
	const hasIssues = issues.length > 0;
	const highestImpactIssue = getHighestImpactIssue({
		issues,
	});

	if (highestImpactIssue) {
		const issueData = JSON.parse(highestImpactIssue?.data);

		// Copy original data
		//---------------------
		customValue.privileged = issueData.privileged;
		customValue.transferFeeLimits = issueData.transferFeeLimits;

		// getIsModifiable
		//---------------------
		const isModifiable = getIsModifiable({ issueData });
		if (isModifiable) {
			modifiable = isModifiable;
		}

		// get transferFees
		//---------------------
		const transferFees = getTransferFees({ issueData });
		if (transferFees) {
			customValue.transferFees = transferFees;
		}

		impact = getImpact({
			modifiable,
			defiImpact: highestImpactIssue.impact,
		});
	}

	console.log(customValue);

	if (hasIssues) {
		contract[key] = {
			result: true,
			value: customValue,
			impact,
			confidence: highestImpactIssue?.confidence || null,
			modifiable,
			deFiIssues: issues,
		};
	}
};

export { hasTransferFee };
