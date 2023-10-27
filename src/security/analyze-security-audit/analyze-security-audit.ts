// Move  Up
import { Impact } from '../security-audits/de-fi/common/enums';
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
			isSafe: null,
			needsManualReview: null,
		},
		risk: {
			criticalCount: 0,
			highCount: 0,
			mediumCount: 0,
			lowCount: 0,
			informationalCount: 0,
			critical: {},
			high: {},
			medium: {},
			low: {},
			informational: {},
		},
	} as IAnalysis;
	const { contract } = securityAudit;

	Object.keys(contract).forEach((contractPropName) => {
		const contractPropValue = contract[contractPropName];

		if (contractPropValue.impact === Impact.Critical) {
			analysis.risk.critical[contractPropName] = contractPropValue;
			analysis.risk.criticalCount += 1;
		}

		if (contractPropValue.impact === Impact.High) {
			analysis.risk.high[contractPropName] = contractPropValue;
			analysis.risk.highCount += 1;
		}

		if (contractPropValue.impact === Impact.Medium) {
			analysis.risk.medium[contractPropName] = contractPropValue;
			analysis.risk.mediumCount += 1;
		}

		if (contractPropValue.impact === Impact.Low) {
			analysis.risk.low[contractPropName] = contractPropValue;
			analysis.risk.lowCount += 1;
		}

		if (contractPropValue.impact === Impact.Informational) {
			analysis.risk.low[contractPropName] = contractPropValue;
			analysis.risk.informationalCount += 1;
		}
	});

	if (analysis.risk.criticalCount > 0 || analysis.risk.highCount > 0) {
		analysis.purchase.isSafe = false;
	} else {
		analysis.purchase.isSafe = true;
	}

	if (
		analysis.risk.criticalCount > 0 ||
		analysis.risk.highCount > 0 ||
		analysis.risk.mediumCount > 0
	) {
		analysis.purchase.needsManualReview = true;
	}

	return analysis;
};

export { analyzeSecurityAudit };
