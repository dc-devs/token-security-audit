import { ICoreIssue } from './common/interfaces';
import { coreIssueIdNameMap } from './common/constants';
import { ISecurityAudit, IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';

interface ICustomizeDataStrategies {
	[key: string]: ({
		key,
		issues,
		contract,
	}: {
		key: string;
		issues: any[]; // Type this IDeFiIssue
		contract: IContract;
	}) => void;
}

const customizeDataStrategies: ICustomizeDataStrategies = {
	hasTransferFee: ({ key, issues, contract }) => {
		// Get Transfer Fees
		let highestTransferFee = 0;
		let modifiable = false;

		const transferFeeDatas = issues.map((issue) => {
			return JSON.parse(issue.data);
		});

		transferFeeDatas.forEach((transferFeeData) => {
			const transferFees = transferFeeData?.transferFee;
			const isModifiable = transferFeeData?.modifiable;

			transferFees.forEach((transferFee: any) => {
				const currentTransferFee = transferFee?.value;

				if (currentTransferFee > highestTransferFee) {
					highestTransferFee = currentTransferFee;
				}
			});

			if (isModifiable) {
				modifiable = isModifiable;
			}
		});

		contract[key] = {
			result: true,
			value: highestTransferFee,
			modifiable,
			deFiIssues: issues,
		};
	},
	hasTransferLimit: ({ key, issues, contract }) => {
		// Get Transfer Fees
		let highestUpperTransferLimit = 0;
		let highestLowerTransferLimit = 0;

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
			modifiable: null,
			deFiIssues: issues,
		};
	},
	hasVerifiedSourceCode: ({ key, issues, contract }) => {
		console.log('issues.length === 0');
		contract[key] = {
			result: issues.length === 0,
			value: null,
			modifiable: null,
			deFiIssues: issues,
		};
	},
};

interface IOptions {
	response: any;
}

const deFiAdapter = ({ response }: IOptions): ISecurityAudit => {
	let adaptedSecurityAudit = generateDefaultSecurityAudit();
	const { inProgress, estimatedAnalyzingTime, coreIssues } = response.data
		.scannerProject as any;

	if (Array.isArray(coreIssues)) {
		coreIssues.forEach((deFiCoreIssue) => {
			const { scwTitle, scwDescription, scwId, issues } = deFiCoreIssue;

			const coreIssue: ICoreIssue = {
				id: scwId,
				title: scwTitle,
				description: scwDescription,
				issues,
			};

			const hasIssues = issues.length > 0;
			const key = coreIssueIdNameMap[coreIssue.id];
			const customizeDataStrategy = customizeDataStrategies[key];

			// Additional value modifiacation here:
			// buy tax,
			// sell tax,
			// transfer amount etc..
			if (customizeDataStrategy) {
				customizeDataStrategy({
					key,
					issues,
					contract: adaptedSecurityAudit.contract,
				});
			} else {
				adaptedSecurityAudit.contract[key] = {
					result: hasIssues,
					value: null,
					modifiable: null,
					deFiIssues: issues,
				};
			}
		});
	}

	return adaptedSecurityAudit;
};

export { deFiAdapter };
