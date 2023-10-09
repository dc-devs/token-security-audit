import { deFiResponse } from '../../../../defi/dexter-audit';
import { ICoreIssue } from './common/interfaces';
import { coreIssueIdNameMap } from './common/constants';
import { ISecurityResults } from '../../common/interfaces';
import { defaultSecurityResults } from '../../common/defaults';

interface IOptions {
	response: any;
}

const deFiAdapter = ({ response }: IOptions): ISecurityResults => {
	const results: ISecurityResults = { ...defaultSecurityResults };
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

			results.contract[key] = {
				result: hasIssues,
				issues,
			};
		});
	}

	return results;
};

export { deFiAdapter };
