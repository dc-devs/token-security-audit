// interface IHolder {
// 	// TODO
// 	[key: string]: Record<string, unknown>;
// }

// interface IHolders {
// 	list: IHolder[];
// 	count: string;
// }

// interface IDex {
// 	// TODO
// 	[key: string]: Record<string, unknown>;
// }

// interface IDexData {
// 	isInDex: boolean;
// 	deployedTo: IDex[];
// }

// interface IToken {
// 	name: string;
// 	symbol: string;
// 	totalSupply: string;
// }

// interface IOther {
// 	notes: string;
// 	potentialRisks: string;
// }

// interface ILiquidityProvider {
// 	holders: string;
// 	holderCount: string;
// 	totalSupply: string; // could be "No"
// }

// interface IContract {
// 	hasVulnerableWithrawlFunction: boolean;
// 	isContractOpenSource: boolean;
// 	isHoneyPot: boolean;
// 	isHoneyPotWithSameCreator: boolean;
// 	buyTax: string; // convert to number
// 	sellTax: string; // convert to number
// 	hasProxyContract: boolean;
// 	isMintable: boolean;
// 	canTakeBackOwnership: boolean;
// 	// isBalanceModifiable:
// 	// hasHiddenOwners:
// 	// canSelfDestruct:
// 	isBuyingAvailable: boolean;
// 	// isSellingAvailable:
// 	canUserSellAll: boolean;
// 	canTaxBeModdified: boolean;
// 	canUserTaxBeModified: boolean;
// 	isTransferPausable: boolean;
// 	hasBlacklist: boolean;
// 	hasWhitelist: boolean;
// 	isAntiWhale: boolean;
// 	isAntiWhaleModifiable: boolean;
// 	hasTradingCoolDown: boolean;
// 	// isUserTaxModifiable:
// 	isTrueToken: boolean;
// 	isAirdropScam: boolean;
// 	isOnTrustList: boolean;
// 	hasExternalCall: boolean;
// 	canContractSelfDestruct: boolean;
// 	hasHiddenOwners: boolean;
// }

// interface IOwner {
// 	changeBalance: string;
// 	percent: string;
// 	address: string;
// 	balance: string;
// }

// interface ICreator {
// 	balance: string;
// 	percent: string;
// 	address: string;
// }

// interface IProprietary {
// 	[key: string]: any;
// 	// Copy cat token?
// 	// Suspicious trading activity
// 	// --> $Xbox had fake trading volume
// 	// --> All wallets created same #days ago (32)
// 	// --> All tokens interacted with dumped
// }

// // TODO UNDO MANDATORY
// interface ISecurityResults {
// 	holders?: IHolders;
// 	dexData?: IDexData;
// 	token?: IToken;
// 	other?: IOther;
// 	liquidityProvider?: ILiquidityProvider;
// 	contract?: IContract;
// 	owner?: IOwner;
// 	creator?: ICreator;
// 	proprietary?: IProprietary;
// }

// export { ISecurityResults };
