// @ts-expect-error: Module does not have valid TS declaration file
import { GoPlus, ErrorCode } from '@goplus/sdk-node';
import { createClient } from '@de-fi/sdk';
import { goPlusAdapter, deFiAdapter } from './adapters';
import { ISecurityResults } from './common/interfaces';
import { defaultSecurityResults } from './common/defaults';

// Noting Honeypot data changes
// Something you should continue to test for..
// Maybe other data changes as well over time?
// https://honeypot.is/ethereum

// let chainId = '1';
// let address = '0x5d9ac611c67124d356ae525d841fa0083226d852'.toLowerCase();

interface IConstructorOptions {
	chainId: string;
}

class Security {
	chainId: string;
	results: Record<string, ISecurityResults>;

	constructor({ chainId }: IConstructorOptions) {
		this.chainId = chainId;
		this.results = {};
	}

	async runGoPlusSecurityAudit({
		address,
	}: {
		address: string;
	}): Promise<ISecurityResults> {
		const formattedAddress = address.toLowerCase();
		let adaptedSecurityResults: ISecurityResults = defaultSecurityResults;

		// It will only return 1 result for the 1st token address if not called getAccessToken before
		const response = await GoPlus.tokenSecurity(
			this.chainId,
			[formattedAddress],
			30,
		);

		if (response.code != ErrorCode.SUCCESS) {
			console.error(response.message);
		} else {
			const securityResults = response.result[formattedAddress];

			if (securityResults) {
				adaptedSecurityResults = goPlusAdapter({
					securityResults,
				});

				this.results.goPlus = adaptedSecurityResults;
			} else {
				console.error('No security results:', response);
			}
		}

		return adaptedSecurityResults;
	}

	async runDeFiSecurityAudit({
		address,
	}: {
		address: string;
	}): Promise<ISecurityResults> {
		const formattedAddress = address.toLowerCase();
		let adaptedSecurityResults: ISecurityResults = defaultSecurityResults;
		// const defiApiKey = process.env.DEFI_API_KEY;

		// if (defiApiKey) {
		// 	const client = createClient({
		// 		url: 'https://public-api.de.fi/graphql/',
		// 		headers: { 'X-Api-Key': defiApiKey },
		// 	});

		// 	const response = await client.query({
		// 		scannerProject: [
		// 			{
		// 				where: {
		//	 				chainId: 1,
		// 					address: formattedAddress,
		// 				},
		// 			},
		// 			{
		// 				inProgress: true,
		// 			},
		// 		],
		// 	});
		// }

		adaptedSecurityResults = deFiAdapter();

		this.results.deFi = adaptedSecurityResults;

		return adaptedSecurityResults;
	}

	displayResults() {
		console.log(this.results);
	}
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
