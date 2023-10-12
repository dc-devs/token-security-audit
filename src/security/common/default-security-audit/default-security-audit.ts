import { defaultOther } from './default-other';
import { defaultOwner } from './default-owner';
import { defaultToken } from './default-token';
import { defaultCreator } from './default-creator';
import { defaultHolders } from './default-holders';
import { defaultDexData } from './default-dex-data';
import { defaultContract } from './default-contract';
import { defaultLiquidityProvider } from './default-liquidity-provider';
import { ISecurityAudit } from '../interfaces/security-audit.interface';

const defaultSecurityAudit: ISecurityAudit = {
	token: defaultToken,
	contract: defaultContract,
	owner: defaultOwner,
	creator: defaultCreator,
	dexData: defaultDexData,
	liquidityProvider: defaultLiquidityProvider,
	holders: defaultHolders,
	other: defaultOther,
};

export { defaultSecurityAudit };
