import { hasTransferFee } from './has-transfer-fee';
import { hasTransferLimit } from './has-transfer-limit';
import { hasVerifiedSourceCode } from './has-verified-source-code';
import { ICustomDataStrategiesOptions } from '../../common/interfaces';

const customDataStrategies: ICustomDataStrategiesOptions = {
	hasTransferFee,
	hasTransferLimit,
	hasVerifiedSourceCode,
};

export { customDataStrategies };
