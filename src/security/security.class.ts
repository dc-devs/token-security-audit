// @ts-expect-error: Module does not have valid TS declaration file
import { GoPlus, ErrorCode } from '@goplus/sdk-node';
import { createClient } from '@de-fi/sdk';
import { goPlusAdapter } from './adapters';
import { ISecurityResults } from './common/interfaces';

// Noting Honeypot data changes
// Something you should continue to test for..
// Maybe other data changes as well over time?
// https://honeypot.is/ethereum

// let chainId = '1';
// let address = '0x5d9ac611c67124d356ae525d841fa0083226d852'.toLowerCase();

interface IConstructorOptions {
	chainId: string;
	address: string;
}

class Security {
	chainId: string;
	address: string;
	results: Record<string, ISecurityResults>;

	constructor({ chainId, address }: IConstructorOptions) {
		this.chainId = chainId;
		this.address = address;
		this.results = {};
	}

	async runGoPlusSecurityAudit() {
		// It will only return 1 result for the 1st token address if not called getAccessToken before
		const response = await GoPlus.tokenSecurity(
			this.chainId,
			[this.address],
			30,
		);

		if (response.code != ErrorCode.SUCCESS) {
			console.error(response.message);
		} else {
			const securityResults = response.result[this.address];
			const adaptedSecurityResultls = goPlusAdapter({
				securityResults: securityResults,
			});

			this.results.goPlus = adaptedSecurityResultls;
		}
	}

	displayResults() {
		console.log(this.results);
	}
}

export { Security };
