import { hasTransferFee } from './has-transfer-fee';
import { hasTransferLimit } from './has-transfer-limit';
import { hasVerifiedSourceCode } from './has-verified-source-code';
import { ICustomDataStrategiesOptions } from '../../common/interfaces';

const customAuditStrategies: ICustomDataStrategiesOptions = {
	hasTransferFee,
	hasTransferLimit,
	hasVerifiedSourceCode,
};

export { customAuditStrategies };
