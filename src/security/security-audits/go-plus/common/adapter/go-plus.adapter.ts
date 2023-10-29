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
	const isContractOpenSource = is_open_source === '1';
	adaptedSecurityAudit.contract.isContractOpenSource = {
		result: isContractOpenSource,
		value: null,
		impact: isContractOpenSource ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	const isHoneyPot = is_honeypot === '1';
	adaptedSecurityAudit.contract.isHoneyPot = {
		result: isHoneyPot,
		value: null,
		impact: isHoneyPot ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	const isHoneyPotWithSameCreator = honeypot_with_same_creator === '1';
	adaptedSecurityAudit.contract.isHoneyPotWithSameCreator = {
		result: isHoneyPotWithSameCreator,
		value: null,
		impact: isHoneyPotWithSameCreator ? Impact.Critical : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	const hasProxyContract = is_proxy === '1';
	adaptedSecurityAudit.contract.hasProxyContract = {
		result: hasProxyContract,
		value: null,
		impact: hasProxyContract ? Impact.High : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// Medium Impact
	// ----------------
	const isMintable = is_mintable === '1';
	adaptedSecurityAudit.contract.isMintable = {
		result: isMintable,
		value: null,
		impact: isMintable ? Impact.Medium : null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	// ------

	adaptedSecurityAudit.contract.canRetrieveOwnership = {
		result: can_take_back_ownership === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isBuyingAvailable = {
		result: cannot_buy === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.canUserSellAll = {
		result: cannot_sell_all === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.canTaxBeModdified = {
		result: slippage_modifiable === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.canUserTaxBeModified = {
		result: personal_slippage_modifiable === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isTransferPausable = {
		result: transfer_pausable === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.hasBlacklist = {
		result: is_blacklisted === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.canWalletsBeWhitelisted = {
		result: is_whitelisted === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isAntiWhale = {
		result: is_anti_whale === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isAntiWhaleModifiable = {
		result: anti_whale_modifiable === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.hasTradingCoolDown = {
		result: trading_cooldown === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isTrueToken = {
		result: is_true_token === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isAirdropScam = {
		result: is_airdrop_scam === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.isOnTrustList = {
		result: trust_list === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.hasExternalCalls = {
		result: external_call === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.canContractSelfDestruct = {
		result: selfdestruct === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	adaptedSecurityAudit.contract.hasHiddenOwners = {
		result: hidden_owner === '1',
		value: null,
		impact: null,
		confidence: null,
		modifiable: null,
		deFiIssues: [],
	};

	return adaptedSecurityAudit;
};

export { goPlusAdapter };
