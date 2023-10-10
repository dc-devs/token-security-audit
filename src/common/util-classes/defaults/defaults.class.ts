import { defaultSecurityAudit } from './default-templates';
import { ISecurityAudit } from '../../../security/common/interfaces';

class Defaults {
	static generateDefaultSecurityAudit() {
		const defaultSecurityAuditCopy: ISecurityAudit = {
			...defaultSecurityAudit,
		};

		return defaultSecurityAuditCopy;
	}
}

export { Defaults };
