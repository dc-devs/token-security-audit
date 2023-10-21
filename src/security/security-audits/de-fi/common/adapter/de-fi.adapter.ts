import { ICoreIssue, IIssue } from './common/interfaces';
import { coreIssueIdNameMap } from './common/constants';
import { ISecurityAudit, IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
import { getHighestImpactIssue } from './common/utils/';

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
	},
	hasTransferLimit: ({ key, issues, contract }) => {
		// Get Transfer Fees
		let highestUpperTransferLimit = 0;
		let highestLowerTransferLimit = 0;
		const highestImpactIssue = getHighestImpactIssue({
			issues,
		});

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
			impact: highestImpactIssue?.impact || null,
			confidence: highestImpactIssue?.confidence || null,
			modifiable: null,
			deFiIssues: issues,
		};
	},
	hasVerifiedSourceCode: ({ key, issues, contract }) => {
		const highestImpactIssue = getHighestImpactIssue({
			issues,
		});

		contract[key] = {
			impact: highestImpactIssue?.impact || null,
			confidence: highestImpactIssue?.confidence || null,
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
		coreIssues.forEach(
			(deFiCoreIssue: {
				scwTitle: string;
				scwId: string;
				scwDescription: string;
				issues: IIssue[];
			}) => {
				const { scwTitle, scwDescription, scwId, issues } =
					deFiCoreIssue;

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
					const highestImpactIssue = getHighestImpactIssue({
						issues,
					});

					adaptedSecurityAudit.contract[key] = {
						result: hasIssues,
						value: null,
						impact: highestImpactIssue?.impact || null,
						confidence: highestImpactIssue?.confidence || null,
						modifiable: null,
						deFiIssues: issues,
					};
				}
			},
		);
	}

	return adaptedSecurityAudit;
};

export { deFiAdapter };
