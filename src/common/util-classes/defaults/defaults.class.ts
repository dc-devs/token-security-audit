import { defaultSecurityResults } from './default-templates';
import { ISecurityAudit } from '../../../security/common/interfaces';

class Defaults {
	static generateDefaultSecurityResults() {
		const adaptedSecurityResults: ISecurityAudit = {
			...defaultSecurityResults,
		};

		return adaptedSecurityResults;
	}
}

export { Defaults };
