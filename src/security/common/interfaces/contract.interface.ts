import { IResult } from './result.interface';

interface IContract {
	[key: string]: IResult;
	// DeFi
	hasVulnerableWithrawlFunction: IResult;
	hasReentrancy: IResult;
	arelocksDetected: IResult;
	hasVerifiedSourceCode: IResult; // Only opposite
	isMintable: IResult;
	isTransferPausable: IResult;
	canContractBeUpgraded: IResult;
	hasBlacklist: IResult;
	hasTransferFee: IResult;
	canTokenBeSoldThroughAMM: IResult;
	hasTransferLimit: IResult;
	hasApprovalVulnerability: IResult;
	canOwnerAbuseApprovals: IResult;
	hasInterfaceErrors: IResult;
	hasBlockingLoops: IResult;
	hasCentralizedBalanceControls: IResult;
	hasTransferCooldown: IResult;
	hasApprovalRestrictions: IResult;
	hasExternalCalls: IResult;
	hasAirdropSpecificCode: IResult;
	hasVulnerableOwnershipFunctions: IResult;
	canRetrieveOwnership: IResult;
	isRecentlyDeployedContract: IResult;
	hasMixers: IResult;
	canAdjustMaximalSupply: IResult;
	ownerHasPreviousScams: IResult;
	canUserTaxBeModified: IResult;
	canWalletsBeWhitelisted: IResult;
	canTransfersBeBlockedViaChangingRouter: IResult;
	hasEthDraining: IResult;
	hasRecentInteraction: IResult;
	hasNativeTokenDrainage: IResult;
	hasHardcodedUniswapRouter: IResult;
	hasUnusualOnChainMarkers: IResult;
	hasHighRevocations: IResult;
	isInitializerProtected: IResult;
	// GoPlus
	isContractOpenSource: IResult;
	isHoneyPot: IResult;
	isHoneyPotWithSameCreator: IResult;
	buyTax: IResult;
	sellTax: IResult;
	hasProxyContract: IResult;
	isBuyingAvailable: IResult;
	canUserSellAll: IResult;
	canTaxBeModdified: IResult;
	isAntiWhale: IResult;
	isAntiWhaleModifiable: IResult;
	hasTradingCoolDown: IResult;
	isTrueToken: IResult;
	isOnTrustList: IResult;
	hasHiddenOwners: IResult;
}

export { IContract };
