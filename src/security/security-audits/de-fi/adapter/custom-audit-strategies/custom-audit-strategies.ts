import { hasTransferFee } from './has-transfer-fee';
import { hasTransferLimit } from './has-transfer-limit';
import { hasVerifiedSourceCode } from './has-verified-source-code';
import { ICustomAuditStrategiesOptions } from '../../common/interfaces';

const customAuditStrategies: ICustomAuditStrategiesOptions = {
	hasTransferFee,
	hasTransferLimit,
	hasVerifiedSourceCode,
};

export { customAuditStrategies };
