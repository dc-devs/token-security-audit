// @ts-ignore
import { GoPlus, ErrorCode } from '@goplus/sdk-node';

// Noting Honeypot data changes
// Something you should continue to test for..
// Maybe other data changes as well over time?
// https://honeypot.is/ethereum

// Fetch Security details
let chainId = '1';
let address = '0x5d9ac611c67124d356ae525d841fa0083226d852'.toLowerCase();

// It will only return 1 result for the 1st token address if not called getAccessToken before
let res = await GoPlus.tokenSecurity(chainId, [address], 30);
if (res.code != ErrorCode.SUCCESS) {
	console.error(res.message);
} else {
	console.log(res.result['0x5d9ac611c67124d356ae525d841fa0083226d852']);

	const {
		buy_tax,
		sell_tax,
		is_proxy,
		trust_list,
		cannot_buy,
		is_honeypot,
		is_mintable,
		is_anti_whale,
		is_blacklisted,
		is_open_source,
		is_true_token,
		is_whitelisted,
		is_airdrop_scam,
		cannot_sell_all,
		trading_cooldown,
		transfer_pausable,
		slippage_modifiable,
		anti_whale_modifiable,
		can_take_back_ownership,
		honeypot_with_same_creator,
		personal_slippage_modifiable,
	} = res.result['0x5d9ac611c67124d356ae525d841fa0083226d852'];

	const securityResults = {
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
		},
		owner: {},
	};

	console.log(securityResults);
}

export {};

// {
//   lp_total_supply: "0.291547594742265023",
//   lp_holders: [
//     {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x44bd6482dc41483e102bbe013ec6782afa4ec517",
//       balance: "0.291547594742264023",
//       tag: "",
//       percent: "0.999999999999996570",
//       locked_detail: undefined
//     }, {
//       is_locked: 1,
//       is_contract: 0,
//       address: "0x0000000000000000000000000000000000000000",
//       balance: "0.000000000000001",
//       tag: "Null Address",
//       percent: "0.000000000000003429",
//       locked_detail: undefined
//     }
//   ],
//   transfer_pausable: "0",
//   trading_cooldown: "1",
//   hidden_owner: "0",
//   selfdestruct: "0",
//   owner_percent: "0.000000",
//   is_whitelisted: "1",
//   holder_count: "11",
//   is_honeypot: "0",
//   honeypot_with_same_creator: "0",
//   holders: [
//     {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0x8907e4112fce157925acd9b719b1cfd786bad123",
//       balance: "66761911.015331605",
//       tag: "UniswapV2",
//       percent: "0.667619110153316050",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0x5d9ac611c67124d356ae525d841fa0083226d852",
//       balance: "18207463.347700259",
//       tag: "",
//       percent: "0.182074633477002590",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0xd767964332fd20331ae50057a375b9caceeaa73e",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x94977e407466708a8b23a56903012645ac2dad03",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x6f23173b74e8606f33af9740745079d303d80004",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x6ccbceecf0758d91d7a0bf20b16b2b1b0c329ea7",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x60ee127b75f1aa467eb7b3e4e6e637ee6fd0e8ff",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x570d456aa7c3dbc74b8fcb624a5705831ee085d6",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x4c7ebb117f17d94016199315278138ac54a17b37",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x14c6479c88b2c445d0bdb67185da99e2cc9e0939",
//       balance: "1700000",
//       tag: "",
//       percent: "0.017000000000000000",
//       locked_detail: undefined
//     }
//   ],
//   dex: [
//     {
//       name: "UniswapV2",
//       liquidity: "2123.68163460",
//       pair: "0x8907e4112fce157925acd9b719b1cfd786bad123"
//     }
//   ],
//   is_open_source: "1",
//   sell_tax: "0.147",
//   token_name: "Gea Kul",
//   creator_address: "0x44bd6482dc41483e102bbe013ec6782afa4ec517",
//   creator_percent: "0.000000",
//   is_proxy: "0",
//   creator_balance: "0",
//   is_in_dex: "1",
//   owner_balance: "0",
//   total_supply: "100000000",
//   can_take_back_ownership: "0",
//   is_blacklisted: "0",
//   owner_address: "0x44bd6482dc41483e102bbe013ec6782afa4ec517",
//   slippage_modifiable: "0",
//   buy_tax: "0.15",
//   external_call: "0",
//   cannot_sell_all: "0",
//   lp_holder_count: "2",
//   personal_slippage_modifiable: "0",
//   is_anti_whale: "1",
//   is_mintable: "0",
//   owner_change_balance: "0",
//   cannot_buy: "0",
//   anti_whale_modifiable: "0",
//   token_symbol: "GEAKUL",
//   note: undefined,
//   is_airdrop_scam: undefined,
//   other_potential_risks: undefined,
//   trust_list: undefined,
//   is_true_token: undefined
// }

// {
//   lp_total_supply: "998.210996421455694372",
//   lp_holders: [
//     {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x5e1ddd11ccfa137a7b91c103f36c88a3e43f4ab1",
//       balance: "142.65139303435340837",
//       tag: "",
//       percent: "0.142907054265834211",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x8f11a1f0c189347fb0479f84e8cd8b7dfbd52c7d",
//       balance: "132.646048157518308472",
//       tag: "",
//       percent: "0.132883777711374443",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x91f84b22a64c0c4b7289c087f4ac549881131183",
//       balance: "88.252831538508955544",
//       tag: "",
//       percent: "0.088410999132339388",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x518b10d9c222f8dd86eeb263307c853602bc2b94",
//       balance: "87.757486166373292291",
//       tag: "",
//       percent: "0.087914765997349435",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x2d39fa81134f21c50a5bfef911e83b569c833ae1",
//       balance: "76.080250672666422552",
//       tag: "",
//       percent: "0.076216602447188932",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0xbd530a1c060dc600b951f16dc656e4ea451d1a2d",
//       balance: "73.346368268221494023",
//       tag: "",
//       percent: "0.073477820351774454",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0xf4b54f37b2a6112ca6933ea24d6a83771633d340",
//       balance: "46.004368865970748128",
//       tag: "",
//       percent: "0.046086818348920688",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x193d0737fded7765dbb97d644891189f6fa6745f",
//       balance: "40.54600498595105614",
//       tag: "",
//       percent: "0.040618671935399202",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x337844866ce1f51be8eb9f3a4882b5cb891edba5",
//       balance: "35.011528383994085935",
//       tag: "",
//       percent: "0.035074276389970595",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0xadcf51606a8307f74b3109b1a0c619db4d950624",
//       balance: "32.724818412479840899",
//       tag: "",
//       percent: "0.032783468154325021",
//       locked_detail: undefined
//     }
//   ],
//   transfer_pausable: "1",
//   trading_cooldown: "0",
//   hidden_owner: "0",
//   selfdestruct: "0",
//   owner_percent: "0.000000",
//   is_whitelisted: "0",
//   holder_count: "61436",
//   is_honeypot: "0",
//   honeypot_with_same_creator: "0",
//   holders: [
//     {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0x60ab11fe605d2a2c3cf351824816772a131f8782",
//       balance: "130100000",
//       tag: "",
//       percent: "0.130100047772249666",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0xf977814e90da44bfa03b6295a0616a897441acec",
//       balance: "119767995.548",
//       tag: "",
//       percent: "0.119768039526374983",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x060e7db91a3cec316799a7bf98729889d43e03f0",
//       balance: "41124422.001882843263186131",
//       tag: "",
//       percent: "0.041124437102621930",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
//       balance: "40000000",
//       tag: "",
//       percent: "0.040000014687855393",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x6124a06e03c4e2d6d9b974b55cad9ed78cf401d6",
//       balance: "39230748.3049371974222491",
//       tag: "",
//       percent: "0.039230762710326149",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x5a52e96bacdabb82fd05763e25335261b270efcb",
//       balance: "24000000",
//       tag: "",
//       percent: "0.024000008812713235",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0x6cc5f688a315f3dc28a7781717a9a798a59fda7b",
//       balance: "21855668.039093942075059978",
//       tag: "",
//       percent: "0.021855676064416234",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 0,
//       address: "0xe65e21a72e74cd8d5e91ae6cccb0ece13262d4de",
//       balance: "18355333.588154659915276966",
//       tag: "",
//       percent: "0.018355340328166795",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0xa9d1e08c7793af67e9d92fe308d5697fb81d3e43",
//       balance: "18163058.929135335553086642",
//       tag: "",
//       percent: "0.018163065598544911",
//       locked_detail: undefined
//     }, {
//       is_locked: 0,
//       is_contract: 1,
//       address: "0xafcd96e580138cfa2332c632e66308eacd45c5da",
//       balance: "17290001",
//       tag: "",
//       percent: "0.017290007348825860",
//       locked_detail: undefined
//     }
//   ],
//   dex: [
//     {
//       name: "UniswapV3",
//       liquidity: "58547.23108928604098576749324585839",
//       pair: "0x2dd56b633faa1a5b46107d248714c9ccb6e20920"
//     }, {
//       name: "SushiSwapV2",
//       liquidity: "22216.77085107",
//       pair: "0x611cde65dea90918c0078ac0400a72b0d25b9bb1"
//     }, {
//       name: "UniswapV2",
//       liquidity: "17637.68831665",
//       pair: "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c"
//     }, {
//       name: "UniswapV3",
//       liquidity: "6463.504842668805484531793163914657",
//       pair: "0x08eac73f000d724678281155c879c50fc6094824"
//     }, {
//       name: "UniswapV3",
//       liquidity: "3643.217926",
//       pair: "0x8dd240195b2cd7c0a118166cba02512f52e9e360"
//     }, {
//       name: "UniswapV2",
//       liquidity: "292.37573952",
//       pair: "0x5e4206b6aa6e919b2bc6e813ea0ffb9b3c8ac042"
//     }, {
//       name: "SushiSwapV2",
//       liquidity: "89.79695925",
//       pair: "0x07d04aaad8108ca86e0f1c792bf165f63a5fedde"
//     }, {
//       name: "UniswapV2",
//       liquidity: "77.31795271",
//       pair: "0x07f068ca326a469fc1d87d85d448990c8cba7df9"
//     }, {
//       name: "SushiSwapV2",
//       liquidity: "5.71305543",
//       pair: "0x7234324a3aa1dd3cc5f2485d26a8a635ccb72d3e"
//     }, {
//       name: "UniswapV2",
//       liquidity: "5.29393846",
//       pair: "0x2d0a1c45cd6f7cdb718703d0897c877efc9db9f7"
//     }, {
//       name: "UniswapV2",
//       liquidity: "1.61039900",
//       pair: "0x285110d71393ce119277f0462006074b8b4cbfe9"
//     }
//   ],
//   is_open_source: "1",
//   sell_tax: "0",
//   token_name: "Republic Token",
//   creator_address: "0x9b1b265e548283430e6ae4721842c448f4bed559",
//   creator_percent: "0.000000",
//   is_proxy: "0",
//   creator_balance: "10",
//   is_in_dex: "1",
//   owner_balance: "0",
//   total_supply: "999999632.80375",
//   can_take_back_ownership: "0",
//   is_blacklisted: "0",
//   owner_address: "0x0000000000000000000000000000000000000001",
//   slippage_modifiable: "0",
//   buy_tax: "0.0001",
//   external_call: "0",
//   cannot_sell_all: "0",
//   lp_holder_count: "109",
//   personal_slippage_modifiable: "0",
//   is_anti_whale: "0",
//   is_mintable: "1",
//   owner_change_balance: "0",
//   cannot_buy: "0",
//   anti_whale_modifiable: "0",
//   token_symbol: "REN",
//   note: undefined,
//   is_airdrop_scam: undefined,
//   other_potential_risks: undefined,
//   trust_list: undefined,
//   is_true_token: undefined
// }
