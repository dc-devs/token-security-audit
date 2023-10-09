import { IHolder } from '../interfaces';

interface ILiquidityProvider {
	holders: IHolder[];
	holderCount: string | null;
	totalSupply: string | null;
}

export { ILiquidityProvider };
