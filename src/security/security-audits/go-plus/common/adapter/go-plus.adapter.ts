import { ISecurityAudit } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
interface IOptions {
	securityResults: any;
}

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

	adaptedSecurityAudit.contract.isContractOpenSource = {
		result: is_open_source === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isHoneyPot = {
		result: is_honeypot === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isHoneyPotWithSameCreator = {
		result: honeypot_with_same_creator === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.buyTax = {
		result: buy_tax,
		issues: [],
	};

	adaptedSecurityAudit.contract.sellTax = {
		result: sell_tax,
		issues: [],
	};

	adaptedSecurityAudit.contract.hasProxyContract = {
		result: is_proxy === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isMintable = {
		result: is_mintable === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canRetrieveOwnership = {
		result: can_take_back_ownership === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isBuyingAvailable = {
		result: cannot_buy === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canUserSellAll = {
		result: cannot_sell_all === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canTaxBeModdified = {
		result: slippage_modifiable === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canUserTaxBeModified = {
		result: personal_slippage_modifiable === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isTransferPausable = {
		result: transfer_pausable === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.hasBlacklist = {
		result: is_blacklisted === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canWalletsBeWhitelisted = {
		result: is_whitelisted === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isAntiWhale = {
		result: is_anti_whale === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isAntiWhaleModifiable = {
		result: anti_whale_modifiable === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.hasTradingCoolDown = {
		result: trading_cooldown === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isTrueToken = {
		result: is_true_token === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isAirdropScam = {
		result: is_airdrop_scam === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.isOnTrustList = {
		result: trust_list === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.hasExternalCalls = {
		result: external_call === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.canContractSelfDestruct = {
		result: selfdestruct === '1',
		issues: [],
	};

	adaptedSecurityAudit.contract.hasHiddenOwners = {
		result: hidden_owner === '1',
		issues: [],
	};

	return adaptedSecurityAudit;
};

export { goPlusAdapter };
