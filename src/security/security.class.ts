// @ts-expect-error: Module does not have valid TS declaration file
import { GoPlus, ErrorCode } from '@goplus/sdk-node';
import { createClient } from '@de-fi/sdk';
import { goPlusAdapter, deFiAdapter } from './adapters';
import { ISecurityResults, IContract } from './common/interfaces';
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
		let adaptedSecurityResults: ISecurityResults = {
			...defaultSecurityResults,
		};

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
		let adaptedSecurityResults: ISecurityResults = {
			...defaultSecurityResults,
		};
		const defiApiKey = process.env.DEFI_API_KEY;

		if (defiApiKey) {
			const client = createClient({
				url: 'https://public-api.de.fi/graphql/',
				headers: { 'X-Api-Key': defiApiKey },
			});

			const response = await client.query({
				scannerProject: [
					{
						where: {
							chainId: 1,
							address: formattedAddress,
						},
					},
					{
						id: true,
						address: true,
						network: true,
						inProgress: true,
						name: true,
						contractName: true,
						firstTxFrom: true,
						firstTxDate: true,
						firstTxBlock: true,
						onChainScanned: true,
						staticAnalizeScanned: true,
						diffCheckScanned: true,
						logo: true,
						compilerVersion: true,
						txCount: true,
						initialFunder: true,
						initialFunding: true,
						outdatedCompiler: true,
						scannedVersion: true,
						scannerVersion: true,
						protocol: true,
						whitelisted: true,
						estimatedAnalyzingTime: true,
						rescanCount: true,
						deploymentBlock: true,
						sourceCodeLink: true,
						link: true,
						coreIssues: {
							scwId: true,
							scwTitle: true,
							scwDescription: true,
							issues: {
								id: true,
								confidence: true,
								impact: true,
								description: true,
								start: true,
								end: true,
								data: true,
								severityChanges: {
									from: true,
									to: true,
									reason: true,
								},
								additionalData: {
									title: true,
									description: true,
								},
								governanceInfo: {
									owners: {
										type: true,
										owner: true,
										timelockDelay: true,
									},
									worstOwner: {
										type: true,
										owner: true,
										timelockDelay: true,
									},
								},
							},
						},
						generalIssues: {
							scwId: true,
							scwTitle: true,
							scwDescription: true,
							issues: {
								id: true,
								confidence: true,
								impact: true,
								description: true,
								start: true,
								end: true,
								data: true,
								severityChanges: {
									from: true,
									to: true,
									reason: true,
								},
								additionalData: {
									title: true,
									description: true,
								},
								governanceInfo: {
									owners: {
										type: true,
										owner: true,
										timelockDelay: true,
									},
									worstOwner: {
										type: true,
										owner: true,
										timelockDelay: true,
									},
								},
							},
						},
						stats: {
							low: true,
							medium: true,
							high: true,
							critical: true,
							total: true,
							percentage: true,
							scammed: true,
						},
						proxyData: {
							proxyOwner: true,
							sourceCodeLink: true,
							proxyIssues: {
								issues: {
									id: true,
									confidence: true,
									impact: true,
									description: true,
									start: true,
									end: true,
									data: true,
									severityChanges: {
										from: true,
										to: true,
										reason: true,
									},
									additionalData: {
										title: true,
										description: true,
									},
									governanceInfo: {
										owners: {
											type: true,
											owner: true,
											timelockDelay: true,
										},
										worstOwner: {
											type: true,
											owner: true,
											timelockDelay: true,
										},
									},
								},
							},
							implementationData: {
								firstTxFrom: true,
								firstTxDate: true,
								firstTxBlock: true,
								name: true,
								initialFunder: true,
								initialFunding: true,
							},
						},
						diffs: {
							id: true,
							address: true,
							network: true,
							name: true,
							projectName: true,
							score: true,
							createdAt: true,
						},
					},
				],
			});

			adaptedSecurityResults = deFiAdapter({ response });
			this.results.deFi = adaptedSecurityResults;
		}

		return adaptedSecurityResults;
	}

	mergeSecurityAudits({
		securityAudits,
	}: {
		securityAudits: Record<string, ISecurityResults>;
	}) {
		// LEFT OFF Write Merge code..
		// After build class to analyze and try to build buying deciscion with,
		// Or at least a percentage
		// Maybe if no red flags autobuys
		// if red flags alerts to look at to manually buy..
		// ^^ maybe always manually buy to start..
	}

	async start({ address }: { address: string }) {
		// Maybe make these functional..
		// await this.runGoPlusSecurityAudit({ address });
		await this.runDeFiSecurityAudit({ address });

		// this.mergeSecurityAudits({ securityAudits: this.results });
	}

	displayResults() {
		const deFiResults = this.results.deFi;

		Object.keys(this.results.deFi).forEach((key) => {
			const value = deFiResults[key];

			if (key === 'contract') {
				console.log(key);
				const contract = value as IContract;

				Object.keys(contract).forEach((key) => {
					const contractPropValue = contract[key];
					console.log(`  ${key}`);

					Object.keys(contractPropValue).forEach((key) => {
						const contractPropValueSet = contractPropValue[key];
						console.log('  ', key, '  ', contractPropValueSet);
					});
				});
			}
		});
	}
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
