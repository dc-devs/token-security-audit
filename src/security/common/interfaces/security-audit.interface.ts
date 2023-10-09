import { IToken } from './token.interface';
import { IOwner } from './owner.interface';
import { IOther } from './other.interface';
import { IHolders } from './holders.interface';
import { ICreator } from './creator.interface';
import { IDexData } from './dex-data.interface';
import { IContract } from './contract.interface';
import { ILiquidityProvider } from './liquidity-provider.interface';

interface ISecurityAudit {
	[key: string]:
		| IContract
		| IHolders
		| IDexData
		| IToken
		| IOther
		| ILiquidityProvider
		| IOwner
		| ICreator;
	contract: IContract;
	holders: IHolders;
	dexData: IDexData;
	token: IToken;
	other: IOther;
	liquidityProvider: ILiquidityProvider;
	owner: IOwner;
	creator: ICreator;
}

export { ISecurityAudit };
