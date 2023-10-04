import { Security } from '../../security';
import { ethers as ethersJs } from 'ethers';
import { ethers } from '../../common/classes/ethers';
import { UniswapV2FactoryAbi } from '../../common/abis/uniswap-v2';
import { UniswapV2Address, UniswapV2FactoryEvent } from '../../common/enums';
import { Reporter, UniswapV2Pair, UniswapV2Erc20 } from '../../common/classes';

class UniswapV2Factory {
	abi: any[];
	address: string;
	contract: ethersJs.Contract;

	constructor() {
		const abi = UniswapV2FactoryAbi;
		const address = UniswapV2Address.Factory;

		this.abi = abi;
		this.address = address;
		this.contract = ethers.contract({
			abi,
			address,
		});

		return this;
	}

	async init() {
		return this;
	}

	trackPairCreated() {
		this.contract.on(
			UniswapV2FactoryEvent.PairCreated,
			async (token0Address, token1Address, pairAddress) => {
				// These errored out, try dry run to test and fix..
				// Pair Created:
				// 0xB10D43914F80978edcFBa4c2F20Cb9dD9f4A4fFd
				// 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
				// 0x836CD1E0af7CAc1f8592408B99e738B48A5d4Ab3

				console.log('Pair Created:');
				console.log(token0Address, token1Address, pairAddress);

				// Fetch token details
				const token0 = await new UniswapV2Erc20({
					address: token0Address,
				}).init();
				console.log(token0);

				const token1 = await new UniswapV2Erc20({
					address: token1Address,
				}).init();
				console.log(token1);

				// Fetch pair details
				const uniswapV2Pair = await new UniswapV2Pair({
					address: pairAddress,
				}).init();

				// Fetch liquidity details
				const reserves = await uniswapV2Pair.contract.getReserves();
				const { reserve0, reserve1 } = reserves;

				// TODO: Pull this out so this methods returns this data
				// Gloobal Store, PubSub?
				// Log data to console
				const reporter = new Reporter();
				reporter.logTokenPair({
					token0,
					token1,
					reserve0,
					reserve1,
					pairAddress,
				});

				const security = new Security({
					chainId: '1',
					address: token0Address,
				});
				await security.runGoPlusSecurityAudit();
				security.displayResults();
			},
		);
	}
}

export { UniswapV2Factory };
