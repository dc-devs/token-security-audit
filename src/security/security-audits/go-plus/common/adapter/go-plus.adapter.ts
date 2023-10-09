import { ISecurityAudit } from '../../../../common/interfaces';
import { defaultSecurityResults } from '../../../../../common/util-classes/defaults/default-templates';

interface IOptions {
	securityResults: any;
}

const goPlusAdapter = ({ securityResults }: IOptions): ISecurityAudit => {
	let adaptedSecurityResults: ISecurityAudit = {
		...defaultSecurityResults,
	};

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

	adaptedSecurityResults.holders = {
		list: holders,
		count: holder_count,
	};

	adaptedSecurityResults.dexData = {
		isInDex: is_in_dex === '1',
		deployedTo: dex,
	};

	adaptedSecurityResults.token = {
		name: token_name,
		symbol: token_symbol,
		totalSupply: total_supply,
	};

	adaptedSecurityResults.other = {
		notes: note,
		potentialRisks: other_potential_risks,
	};

	adaptedSecurityResults.liquidityProvider = {
		holders: lp_holders,
		holderCount: lp_holder_count,
		totalSupply: lp_total_supply,
	};

	adaptedSecurityResults.owner = {
		changeBalance: owner_change_balance,
		percent: owner_percent,
		address: owner_address,
		balance: owner_balance,
	};

	adaptedSecurityResults.creator = {
		balance: creator_balance,
		percent: creator_percent,
		address: creator_address,
	};

	adaptedSecurityResults.contract.isContractOpenSource = {
		result: is_open_source === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isHoneyPot = {
		result: is_honeypot === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isHoneyPotWithSameCreator = {
		result: honeypot_with_same_creator === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.buyTax = {
		result: buy_tax,
		issues: [],
	};

	adaptedSecurityResults.contract.sellTax = {
		result: sell_tax,
		issues: [],
	};

	adaptedSecurityResults.contract.hasProxyContract = {
		result: is_proxy === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isMintable = {
		result: is_mintable === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canRetrieveOwnership = {
		result: can_take_back_ownership === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isBuyingAvailable = {
		result: cannot_buy === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canUserSellAll = {
		result: cannot_sell_all === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canTaxBeModdified = {
		result: slippage_modifiable === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canUserTaxBeModified = {
		result: personal_slippage_modifiable === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isTransferPausable = {
		result: transfer_pausable === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.hasBlacklist = {
		result: is_blacklisted === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canWalletsBeWhitelisted = {
		result: is_whitelisted === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isAntiWhale = {
		result: is_anti_whale === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isAntiWhaleModifiable = {
		result: anti_whale_modifiable === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.hasTradingCoolDown = {
		result: trading_cooldown === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isTrueToken = {
		result: is_true_token === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isAirdropScam = {
		result: is_airdrop_scam === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.isOnTrustList = {
		result: trust_list === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.hasExternalCalls = {
		result: external_call === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.canContractSelfDestruct = {
		result: selfdestruct === '1',
		issues: [],
	};

	adaptedSecurityResults.contract.hasHiddenOwners = {
		result: hidden_owner === '1',
		issues: [],
	};

	return adaptedSecurityResults;
};

export { goPlusAdapter };
