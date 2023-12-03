import { ISecurityAudit } from '../../../../common/interfaces';
import { Impact } from '../../../../security-audits/de-fi/common/enums';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
interface IOptions {
	securityResults: any;
}

// Utils
const getTaxImpact = (tax: number): Impact | null => {
	let impact = null;
	const taxAbove0 = tax > 0;
	const taxAbove5 = tax > 0.05;
	const taxAbove10 = tax > 0.1;
	const taxAbove15 = tax > 0.15;

	if (taxAbove0) {
		impact = Impact.Low;
	}

	if (taxAbove5) {
		impact = Impact.Medium;
	}

	if (taxAbove10) {
		impact = Impact.High;
	}

	if (taxAbove15) {
		impact = Impact.Critical;
	}

	return impact;
};

// LEFT OFF
// Then add this is customStrategy to Analysis

// const highIssues: IHighRiskIssues = {
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
// 	buyTax: true, // Calc high if above 4.99%
// 	sellTax: true, // Calc high if above 4.99%
// };

const goPlusAdapter = ({ securityResults }: IOptions): ISecurityAudit => {
	let adaptedSecurityAudit = generateDefaultSecurityAudit();

	const {
		dex,
		note,
		buy_tax,
		holders,
		is_proxy,
		sell_tax,
		is_in_dex,
		cannot_buy,
		is_mintable,
		token_name,
		lp_holders,
		is_honeypot,
		trust_list,
		holder_count,
		total_supply,
		owner_balance,
		selfdestruct,
		hidden_owner,
		owner_percent,
		owner_address,
		token_symbol,
		external_call,
		is_anti_whale,
		is_open_source,
		is_whitelisted,
		is_true_token,
		is_blacklisted,
		lp_holder_count,
		is_airdrop_scam,
		cannot_sell_all,
		creator_balance,
		creator_percent,
		creator_address,
		lp_total_supply,
		trading_cooldown,
		transfer_pausable,
		slippage_modifiable,
		owner_change_balance,
		anti_whale_modifiable,
		other_potential_risks,
		can_take_back_ownership,
		honeypot_with_same_creator,
		personal_slippage_modifiable,
	} = securityResults;

	adaptedSecurityAudit.holders = {
		list: holders,
		count: holder_count,
	};

	adaptedSecurityAudit.dexData = {
		isInDex: is_in_dex === '1',
		deployedTo: dex,
	};

	adaptedSecurityAudit.token = {
		name: token_name,
		symbol: token_symbol,
		totalSupply: total_supply,
	};

	adaptedSecurityAudit.other = {
		notes: note,
		potentialRisks: other_potential_risks,
	};

	adaptedSecurityAudit.liquidityProvider = {
		holders: lp_holders,
		holderCount: lp_holder_count,
		totalSupply: lp_total_supply,
	};

	adaptedSecurityAudit.owner = {
		changeBalance: owner_change_balance,
		percent: owner_percent,
		address: owner_address,
		balance: owner_balance,
	};

	adaptedSecurityAudit.creator = {
		balance: creator_balance,
		percent: creator_percent,
		address: creator_address,
	};

	// Dynamic Impact
	// -----------------
	// TODO:  Some Values NAN
	const buyTax = Number(buy_tax);
	adaptedSecurityAudit.contract.buyTax = {
		result: buyTax > 0,
		value: buyTax,
		impact: getTaxImpact(buyTax),
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	const sellTax = Number(sell_tax);
	adaptedSecurityAudit.contract.sellTax = {
		result: sellTax > 0,
		value: sellTax,
		impact: getTaxImpact(sellTax),
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Critical Impact
	// --------------------

	// Scam tokens will oftens times not open source their code
	// hiding nefarious code
	const isContractOpenSource = is_open_source === '1';
	adaptedSecurityAudit.contract.isContractOpenSource = {
		result: isContractOpenSource,
		value: null,
		impact: isContractOpenSource ? null : Impact.Critical,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const isHoneyPot = is_honeypot === '1';
	adaptedSecurityAudit.contract.isHoneyPot = {
		result: isHoneyPot,
		value: null,
		impact: isHoneyPot ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const isHoneyPotWithSameCreator = honeypot_with_same_creator === '1';
	adaptedSecurityAudit.contract.isHoneyPotWithSameCreator = {
		result: isHoneyPotWithSameCreator,
		value: null,
		impact: isHoneyPotWithSameCreator ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const isBuyingAvailable = cannot_buy === '1';
	adaptedSecurityAudit.contract.isBuyingAvailable = {
		result: isBuyingAvailable,
		value: null,
		impact: isBuyingAvailable ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const canUserSellAll = cannot_sell_all === '1';
	adaptedSecurityAudit.contract.canUserSellAll = {
		result: canUserSellAll,
		value: null,
		impact: canUserSellAll ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const isTransferPausable = transfer_pausable === '1';
	adaptedSecurityAudit.contract.isTransferPausable = {
		result: isTransferPausable,
		value: null,
		impact: isTransferPausable ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for scams
	const isAirdropScam = is_airdrop_scam === '1';
	adaptedSecurityAudit.contract.isAirdropScam = {
		result: isAirdropScam,
		value: null,
		impact: isAirdropScam ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for honeypot
	const hasExternalCalls = external_call === '1';
	adaptedSecurityAudit.contract.hasExternalCalls = {
		result: hasExternalCalls,
		value: null,
		impact: hasExternalCalls ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// This just seems bad
	const canContractSelfDestruct = selfdestruct === '1';
	adaptedSecurityAudit.contract.canContractSelfDestruct = {
		result: canContractSelfDestruct,
		value: null,
		impact: canContractSelfDestruct ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High value signal for scams
	const hasHiddenOwners = hidden_owner === '1';
	adaptedSecurityAudit.contract.hasHiddenOwners = {
		result: hasHiddenOwners,
		value: null,
		impact: canContractSelfDestruct ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// High Impact
	// ----------------

	// Legit tokens can retain ownership on first launch
	// but this is also a signal for scam tokens
	const canRetrieveOwnership = can_take_back_ownership === '1';
	adaptedSecurityAudit.contract.canRetrieveOwnership = {
		result: canRetrieveOwnership,
		value: null,
		impact: canRetrieveOwnership ? Impact.High : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit tokens can have proxy contracts
	// but this is also a signal for scam tokens (rug w/ updated token contract)
	const hasProxyContract = is_proxy === '1';
	adaptedSecurityAudit.contract.hasProxyContract = {
		result: hasProxyContract,
		value: null,
		impact: hasProxyContract ? Impact.High : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Probably worth flagging copy cats
	const isTrueToken = is_true_token === '1';
	adaptedSecurityAudit.contract.isTrueToken = {
		result: isTrueToken,
		value: null,
		impact: isTrueToken ? Impact.High : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Medium Impact
	// ----------------

	// Legit tokens can still mint tokens
	// Scam tokens might mint tokens
	const isMintable = is_mintable === '1';
	adaptedSecurityAudit.contract.isMintable = {
		result: isMintable,
		value: null,
		impact: isMintable ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins often times start 5% tax, then modify to lower
	// This one is tough since can be legit, but also can be scam
	const canTaxBeModdified = slippage_modifiable === '1';
	adaptedSecurityAudit.contract.canTaxBeModdified = {
		result: canTaxBeModdified,
		value: null,
		impact: canTaxBeModdified ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins often times start 5% tax, then modify to lower
	// This one is tough since can be legit, but also can be scam
	const canUserTaxBeModified = personal_slippage_modifiable === '1';
	adaptedSecurityAudit.contract.canUserTaxBeModified = {
		result: canUserTaxBeModified,
		value: null,
		impact: canUserTaxBeModified ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins can blacklist known bot addresses
	const hasBlacklist = is_blacklisted === '1';
	adaptedSecurityAudit.contract.hasBlacklist = {
		result: hasBlacklist,
		value: null,
		impact: hasBlacklist ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins can whitelist wallet addresses
	const canWalletsBeWhitelisted = is_whitelisted === '1';
	adaptedSecurityAudit.contract.canWalletsBeWhitelisted = {
		result: canWalletsBeWhitelisted,
		value: null,
		impact: canWalletsBeWhitelisted ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins can set anti whale measures when token first launched
	const isAntiWhale = is_anti_whale === '1';
	adaptedSecurityAudit.contract.isAntiWhale = {
		result: isAntiWhale,
		value: null,
		impact: isAntiWhale ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins can set anti whale measures when token first launched
	const isAntiWhaleModifiable = anti_whale_modifiable === '1';
	adaptedSecurityAudit.contract.isAntiWhaleModifiable = {
		result: isAntiWhaleModifiable,
		value: null,
		impact: isAntiWhaleModifiable ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Legit coins can set a trading cooldown to avoid rug pulling
	// by legit wallet addresses
	const hasTradingCoolDown = trading_cooldown === '1';
	adaptedSecurityAudit.contract.hasTradingCoolDown = {
		result: hasTradingCoolDown,
		value: null,
		impact: hasTradingCoolDown ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Low Impact
	// ----------------
	// Not too sure what this measures exactly*
	const isOnTrustList = trust_list === '1';
	adaptedSecurityAudit.contract.isOnTrustList = {
		result: isOnTrustList,
		value: null,
		impact: isOnTrustList ? Impact.Low : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};
	// ------

	return adaptedSecurityAudit;
};

export { goPlusAdapter };
