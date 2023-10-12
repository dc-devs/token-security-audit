import { deepCopy } from '../../../common/utils';
import { defaultSecurityAudit } from '../default-security-audit';
import { ISecurityAudit } from '../../../security/common/interfaces';

const generateDefaultSecurityAudit = (): ISecurityAudit => {
	const target = {} as ISecurityAudit;

	return deepCopy(target, defaultSecurityAudit);
};

export { generateDefaultSecurityAudit };
