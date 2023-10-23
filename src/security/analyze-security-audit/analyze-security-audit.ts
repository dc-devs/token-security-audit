import { ISecurityAudit, IAnalysis, IResult } from '../common/interfaces';

// LEFT OFF
// Below TODO

// TODO Use below info change "severity" during the adapter stage..
// This function will organize accordingly..

// Just for catagorizing
//-------------------------------
// interface ICriticalRiskIssues {
// 	[key: string]: boolean;
// }

// interface IHighRiskIssues {
// 	[key: string]: boolean;
// }

// interface IMediumRiskIssues {
// 	[key: string]: boolean;
// }

// interface ILowRiskIssues {
// 	[key: string]: boolean;
// }

// const highIssues: IHighRiskIssues = {
// 	// DeFi
// 	hasVulnerableWithrawlFunction: true,
// 	hasReentrancy: true,
// 	arelocksDetected: true,
// 	hasVerifiedSourceCode: true, // Opposite
// 	isMintable: true,
// 	isTransferPausable: true,
// 	canContractBeUpgraded: true,
// 	hasApprovalVulnerability: true,
// 	canOwnerAbuseApprovals: true,
// 	hasInterfaceErrors: true,
// 	hasBlockingLoops: true,
// 	hasCentralizedBalanceControls: true,
// 	hasApprovalRestrictions: true,
// 	hasExternalCalls: true,
// 	hasVulnerableOwnershipFunctions: true,
// 	canRetrieveOwnership: true,
// 	ownerHasPreviousScams: true,
// 	canUserTaxBeModified: true,
// 	canTransfersBeBlockedViaChangingRouter: true,
// 	hasEthDraining: true,
// 	hasNativeTokenDrainage: true,
// 	hasHardcodedUniswapRouter: true,
// 	hasUnusualOnChainMarkers: true,
// 	hasHighRevocations: true,
// 	isInitializerProtected: true, // Opposite
// 	// GoPlus
// 	isContractOpenSource: true, // Opposite
// 	isHoneyPot: true,
// 	isHoneyPotWithSameCreator: true,
// 	hasProxyContract: true,
// 	isBuyingAvailable: true, // opposite
// 	canUserSellAll: true, // Opposite
// 	canTaxBeModdified: true,
// 	isTrueToken: true,
// 	isOnTrustList: true, // Opposite
// 	hasHiddenOwners: true,
// };

// const mediumIssues: IMediumRiskIssues = {
// 	// DeFi
// 	// isAntiWhale: true,
// 	// isAntiWhaleModifiable: true,
// 	// hasTradingCoolDown: true,
// 	// hasBlacklist: true,
// 	// hasTransferFee: true,
// 	// hasTransferLimit: true,
// 	// hasTransferCooldown: true,
// 	// hasAirdropSpecificCode: true,
// 	// hasMixers: true,
// 	// canAdjustMaximalSupply: true,
// 	// canWalletsBeWhitelisted: true,
// 	// GoPlus
// 	buyTax: true, // Calc high if above 4.99%
// 	sellTax: true, // Calc high if above 4.99%
// };

// const lowRiskIssues: ILowRiskIssues = {
// 	// DeFi
// 	// canTokenBeSoldThroughAMM: true,
// 	// isRecentlyDeployedContract: true,
// 	// hasRecentInteraction: true,
// 	// GoPlus
// };
//-------------------------------

interface IOptions {
	securityAudit: ISecurityAudit;
}

const analyzeSecurityAudit = ({ securityAudit }: IOptions) => {
	const analysis = {
		purchase: {
			isSafe: false,
			needsManualReview: true,
		},
		risk: {
			criticalCount: 0,
			highCount: 0,
			mediumCount: 0,
			lowCount: 0,
			informationCount: 0,
			critical: {},
			high: {},
			medium: {},
			low: {},
			information: {},
		},
	} as IAnalysis;
	const { contract } = securityAudit;

	// Left Off:
	// Maybe run a number of recent scam coins to confirm what that data looks like
	// Update fields like isContractOpenSource to negative
	// Turn buy tax into number, and calc tax risk

	// Fields to add:
	// RugPulll Risk
	// Dump Risk
	// Low Liquidity
	// Honey Pot

	// New Request "liquidityAnalysis":
	// totalUnlockedPercent
	// isAdequateLiquidityPresent": false,
	// isEnoughLiquidityLocked": false,
	// isCreatorNotContainLiquidity": true,
	//
	//
	// New Request "honeyPot":

	// Initial Orgainization
	Object.keys(contract).forEach((contractPropName) => {
		const contractPropValue = contract[contractPropName];
		const customAnalysisStrategy =
			customAnalysisStrategies[contractPropName];

		if (customAnalysisStrategy) {
			customAnalysisStrategy({
				analysis,
				contractPropName,
				contractPropValue,
			});
		} else {
			if (highIssues[contractPropName] && contractPropValue.result) {
				analysis.risk.high[contractPropName] = contractPropValue;
				analysis.risk.highCount += 1;
			}

			if (mediumIssues[contractPropName] && contractPropValue.result) {
				analysis.risk.medium[contractPropName] = contractPropValue;
				analysis.risk.mediumCount += 1;
			}

			if (lowRiskIssues[contractPropName] && contractPropValue.result) {
				analysis.risk.low[contractPropName] = contractPropValue;
				analysis.risk.lowCount += 1;
			}
		}
	});

	// Custom Orgainization
	// Buy Tax Risk..
	if (analysis.risk.highCount === 0) {
		analysis.purchase.isSafe = true;
	}

	if (analysis.risk.mediumCount === 0) {
		analysis.purchase.needsManualReview = false;
	}

	return analysis;
};

export { analyzeSecurityAudit };
