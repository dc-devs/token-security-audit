interface ICoreIssueIdDescriptionMap {
	[key: string]: string;
}

const coreIssueIdNameMap: ICoreIssueIdDescriptionMap = {
	105: 'hasVulnerableWithrawlFunction', // 'No vulnerable withdrawal functions found',
	107: 'hasReentrancy', // 'No reentrancy risk found',
	150: 'arelocksDetected', // 'No locks detected',
	185: 'hasVerifiedSourceCode', // 'Verified source code not found',
	186: 'isMintable', // 'No mintable risks found',
	189: 'isTransferPausable', // 'Users can always transfer their tokens',
	193: 'canContractBeUpgraded', // 'Contract cannot be upgraded',
	208: 'hasBlacklist', // 'Wallets cannot be blacklisted from transfering the token',
	209: 'hasTransferFee', // 'A fee has been discovered within the contract.',
	210: 'canTokenBeSoldThroughAMM', // 'Token can be sold through regular AMMs',
	211: 'hasTransferLimit', // 'The max/min amount of token transferred can be limited (max could be set to 0).',
	'216-a': 'hasApprovalVulnerability', // 'No ERC20 approval vulnerability found',
	'216-b': 'canOwnerAbuseApprovals', // 'Contract owner cannot abuse ERC20 approvals',
	'204-a': 'hasInterfaceErrors', // 'No ERC20 interface errors found',
	218: 'hasBlockingLoops', // 'No blocking loops found',
	220: 'hasCentralizedBalanceControls', // 'No centralized balance controls found',
	219: 'hasTransferCooldown', // 'No transfer cooldown times found',
	223: 'hasApprovalRestrictions', // 'No approval restrictions found',
	'210-b': 'hasExternalCalls', // 'No external calls detected',
	10004: 'hasAirdropSpecificCode', // 'No airdrop-specific code found',
	230: 'hasVulnerableOwnershipFunctions', // 'No vulnerable ownership functions found.',
	231: 'canRetrieveOwnership', // 'No retrievable ownership found.',
	10010: 'isRecentlyDeployedContract', // 'The smart contract was deployed less than 14 days ago.',
	10003: 'hasMixers', // 'No mixers utilized by contract deployer.',
	233: 'canAdjustMaximalSupply', // 'No adjustable maximum supply found.',
	10016: 'ownerHasPreviousScams', // "No previous scams by owner's wallet found.",
	236: 'canUserTaxBeModified', // 'The contract does not currently support personalized tax functionality.',
	237: 'canWalletsBeWhitelisted', // 'Wallets cannot be whitelisted',
	238: 'canTransfersBeBlockedViaChangingRouter', // 'Transfer cannot be blocked via changing router',
	239: 'hasEthDraining', // 'ETH draining was not found',
	10022: 'hasRecentInteraction', // 'Interaction with the smart contract was less than 30 days ago',
	10023: 'hasNativeTokenDrainage', // 'No instances of native token drainage upon revoking tokens were detected in the contract.',
	241: 'hasHardcodedUniswapRouter', // 'Hardcoded Uniswap router was not found',
	10024: 'hasUnusualOnChainMarkers', // "This token doesn't display any unusual on-chain markers.",
	10025: 'hasHighRevocations', // 'Minimal Revocations Identified.',
	242: 'isInitializerProtected', // 'Initializer is Protected from re-execution.',
};

export { coreIssueIdNameMap };
