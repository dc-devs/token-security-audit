import { ICoreIssue } from '../common/interfaces';
import { coreIssueIdNameMap } from '../common/constants';
import { ISecurityAudit } from '../../../common/interfaces';
import { defaultAuditStrategy } from './default-audit-strategy';
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
			const key = coreIssueIdNameMap[scwId];
			const customAuditStrategy = customAuditStrategies[key];

			if (customAuditStrategy) {
				customAuditStrategy({
					key,
					issues,
					contract: adaptedSecurityAudit.contract,
				});
			} else {
				defaultAuditStrategy({
					key,
					issues,
					contract: adaptedSecurityAudit.contract,
				});
			}
		});
	}

	return adaptedSecurityAudit;
};

export { deFiAdapter };
