import { ICoreIssue } from './common/interfaces';
import { coreIssueIdNameMap } from './common/constants';
import { ISecurityAudit } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';

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

			adaptedSecurityAudit.contract[key] = {
				result: hasIssues,
				issues,
			};
		});
	}

	return adaptedSecurityAudit;
};

export { deFiAdapter };
