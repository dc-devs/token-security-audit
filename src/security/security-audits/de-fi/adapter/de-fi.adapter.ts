import { getHighestImpactIssue } from '../common/utils';
import { ICoreIssue, IIssue } from '../common/interfaces';
import { coreIssueIdNameMap } from '../common/constants';
import { ISecurityAudit } from '../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../common/utils';
import { customDataStrategies } from './custom-data-strategies';

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
				const customizeDataStrategy = customDataStrategies[key];

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
