import { IContract } from '../interfaces';

const defaultContract: IContract = {
	// DeFi
	hasVulnerableWithrawlFunction: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasReentrancy: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	arelocksDetected: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasVerifiedSourceCode: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isMintable: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isTransferPausable: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canContractBeUpgraded: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasBlacklist: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasTransferFee: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canTokenBeSoldThroughAMM: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasTransferLimit: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasApprovalVulnerability: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canOwnerAbuseApprovals: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasInterfaceErrors: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasBlockingLoops: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasCentralizedBalanceControls: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasTransferCooldown: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasApprovalRestrictions: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasExternalCalls: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasAirdropSpecificCode: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasVulnerableOwnershipFunctions: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canRetrieveOwnership: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isRecentlyDeployedContract: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasMixers: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canAdjustMaximalSupply: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	ownerHasPreviousScams: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canUserTaxBeModified: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canWalletsBeWhitelisted: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canTransfersBeBlockedViaChangingRouter: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasEthDraining: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasRecentInteraction: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasNativeTokenDrainage: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasHardcodedUniswapRouter: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasUnusualOnChainMarkers: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasHighRevocations: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isInitializerProtected: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	// GoPlus
	isContractOpenSource: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isHoneyPot: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isHoneyPotWithSameCreator: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	buyTax: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	sellTax: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasProxyContract: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isBuyingAvailable: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canUserSellAll: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	canTaxBeModdified: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isAntiWhale: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isAntiWhaleModifiable: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasTradingCoolDown: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isTrueToken: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	isOnTrustList: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
	hasHiddenOwners: {
		result: null,
		value: null,
		modifiable: null,
		deFiIssues: [],
	},
};

export { defaultContract };
