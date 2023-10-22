import { ICoreIssue } from '../common/interfaces';
import { getHighestImpactIssue } from '../common/utils';
import { coreIssueIdNameMap } from '../common/constants';
import { ISecurityAudit } from '../../../common/interfaces';
import { customAuditStrategies } from './custom-audit-strategies';
import { generateDefaultSecurityAudit } from '../../../common/utils';

interface IOptions {
	response: any;
}

const deFiAdapter = ({ response }: IOptions): ISecurityAudit => {
	let adaptedSecurityAudit = generateDefaultSecurityAudit();
	const { inProgress, estimatedAnalyzingTime, coreIssues } = response.data
		.scannerProject as any;

	if (Array.isArray(coreIssues)) {
		coreIssues.forEach((coreIssue: ICoreIssue) => {
			const { scwId, issues } = coreIssue;
			const hasIssues = issues.length > 0;
			const key = coreIssueIdNameMap[scwId];
			const customAuditStrategy = customAuditStrategies[key];

			// Additional value modifiacation here:
			// buy tax,
			// sell tax,
			// transfer amount etc..
			if (customAuditStrategy) {
				customAuditStrategy({
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
		});
	}

	return adaptedSecurityAudit;
};

export { deFiAdapter };
