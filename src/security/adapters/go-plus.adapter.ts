import { ISecurityResults } from '../common/interfaces';

interface IOptions {
	securityResults: any;
}

const goPlusAdapter = ({ securityResults }: IOptions): ISecurityResults => {
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

	const adaptedSecurityResults = {
		holders: {
			list: holders,
			count: holder_count,
		},
		dexData: {
			isInDex: is_in_dex,
			deployedTo: dex,
		},
		token: {
			name: token_name,
			symbol: token_symbol,
			totalSupply: total_supply,
		},
		other: {
			notes: note,
			potentialRisks: other_potential_risks,
		},
		liquidityProvider: {
			holders: lp_holders,
			holderCount: lp_holder_count,
			totalSupply: lp_total_supply, // could be "No"
		},
		// Probs still incomplete
		contract: {
			isContractOpenSource: is_open_source === '1',
			isHoneyPot: is_honeypot === '1',
			isHoneyPotWithSameCreator: honeypot_with_same_creator === '1',
			buyTax: buy_tax, // convert to number
			sellTax: sell_tax, // convert to number
			hasProxyContract: is_proxy === '1',
			isMintable: is_mintable === '1',
			canTakeBackOwnership: can_take_back_ownership === '1',
			// isBalanceModifiable:
			// hasHiddenOwners:
			// canSelfDestruct:
			// hasExternalCallRisk:
			isBuyingAvailable: cannot_buy === '1',
			// isSellingAvailable:
			canUserSellAll: cannot_sell_all === '1',
			canTaxBeModdified: slippage_modifiable === '1',
			canUserTaxBeModifiedd: personal_slippage_modifiable === '1',
			isTransferPausable: transfer_pausable === '1',
			hasBlacklist: is_blacklisted === '1',
			hasWhitelist: is_whitelisted === '1',
			isAntiWhale: is_anti_whale === '1',
			isAntiWhaleModifiable: anti_whale_modifiable === '1',
			hasTradingCoolDown: trading_cooldown === '1',
			// isUserTaxModifiable:
			isTrueToken: is_true_token === '1',
			isAirdropScam: is_airdrop_scam === '1',
			isOnTrustList: trust_list === '1',
			hasExternalCall: external_call === '1',
			canContractSelfDestruct: selfdestruct === '1',
			hasHiddenOwners: hidden_owner === '1',
		},
		// LEFT OFF
		owner: {
			changeBalance: owner_change_balance,
			percent: owner_percent,
			address: owner_address,
			balance: owner_balance,
		},
		creator: {
			balance: creator_balance,
			percent: creator_percent,
			address: creator_address,
		},
		proprietary: {
			// Copy cat token?
			// Suspicious trading activity
			// --> $Xbox had fake trading volume
			// --> All wallets created same #days ago (32)
			// --> All tokens interacted with dumped
		},
	};

	return adaptedSecurityResults;
};

export { goPlusAdapter };
