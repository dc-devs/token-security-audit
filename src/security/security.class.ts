import { createClient } from '@de-fi/sdk';
import { deFiAdapter } from './adapters';
import { runGoPlusSecurityAudit } from './security-audits';
import { mergeSecurityAudits } from './merge-security-audits';
import { ISecurityAudit, IContract } from './common/interfaces';

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
	finalSecurityAudit?: ISecurityAudit;

	constructor({ chainId }: IConstructorOptions) {
		this.chainId = chainId;
	}

	async runGoPlusSecurityAudit({
		address,
	}: {
		address: string;
	}): Promise<ISecurityAudit> {
		return await runGoPlusSecurityAudit({
			address,
			chainId: this.chainId,
		});
	}

	// async runDeFiSecurityAudit({
	// 	address,
	// }: {
	// 	address: string;
	// }): Promise<ISecurityAudit> {
	// 	const formattedAddress = address.toLowerCase();
	// 	let adaptedSecurityResults: ISecurityAudit = {
	// 		...defaultSecurityResults,
	// 	};
	// 	const defiApiKey = process.env.DEFI_API_KEY;

	// 	if (defiApiKey) {
	// 		const client = createClient({
	// 			url: 'https://public-api.de.fi/graphql/',
	// 			headers: { 'X-Api-Key': defiApiKey },
	// 		});

	// 		const response = await client.query({
	// 			scannerProject: [
	// 				{
	// 					where: {
	// 						chainId: 1,
	// 						address: formattedAddress,
	// 					},
	// 				},
	// 				{
	// 					id: true,
	// 					address: true,
	// 					network: true,
	// 					inProgress: true,
	// 					name: true,
	// 					contractName: true,
	// 					firstTxFrom: true,
	// 					firstTxDate: true,
	// 					firstTxBlock: true,
	// 					onChainScanned: true,
	// 					staticAnalizeScanned: true,
	// 					diffCheckScanned: true,
	// 					logo: true,
	// 					compilerVersion: true,
	// 					txCount: true,
	// 					initialFunder: true,
	// 					initialFunding: true,
	// 					outdatedCompiler: true,
	// 					scannedVersion: true,
	// 					scannerVersion: true,
	// 					protocol: true,
	// 					whitelisted: true,
	// 					estimatedAnalyzingTime: true,
	// 					rescanCount: true,
	// 					deploymentBlock: true,
	// 					sourceCodeLink: true,
	// 					link: true,
	// 					coreIssues: {
	// 						scwId: true,
	// 						scwTitle: true,
	// 						scwDescription: true,
	// 						issues: {
	// 							id: true,
	// 							confidence: true,
	// 							impact: true,
	// 							description: true,
	// 							start: true,
	// 							end: true,
	// 							data: true,
	// 							severityChanges: {
	// 								from: true,
	// 								to: true,
	// 								reason: true,
	// 							},
	// 							additionalData: {
	// 								title: true,
	// 								description: true,
	// 							},
	// 							governanceInfo: {
	// 								owners: {
	// 									type: true,
	// 									owner: true,
	// 									timelockDelay: true,
	// 								},
	// 								worstOwner: {
	// 									type: true,
	// 									owner: true,
	// 									timelockDelay: true,
	// 								},
	// 							},
	// 						},
	// 					},
	// 					generalIssues: {
	// 						scwId: true,
	// 						scwTitle: true,
	// 						scwDescription: true,
	// 						issues: {
	// 							id: true,
	// 							confidence: true,
	// 							impact: true,
	// 							description: true,
	// 							start: true,
	// 							end: true,
	// 							data: true,
	// 							severityChanges: {
	// 								from: true,
	// 								to: true,
	// 								reason: true,
	// 							},
	// 							additionalData: {
	// 								title: true,
	// 								description: true,
	// 							},
	// 							governanceInfo: {
	// 								owners: {
	// 									type: true,
	// 									owner: true,
	// 									timelockDelay: true,
	// 								},
	// 								worstOwner: {
	// 									type: true,
	// 									owner: true,
	// 									timelockDelay: true,
	// 								},
	// 							},
	// 						},
	// 					},
	// 					stats: {
	// 						low: true,
	// 						medium: true,
	// 						high: true,
	// 						critical: true,
	// 						total: true,
	// 						percentage: true,
	// 						scammed: true,
	// 					},
	// 					proxyData: {
	// 						proxyOwner: true,
	// 						sourceCodeLink: true,
	// 						proxyIssues: {
	// 							issues: {
	// 								id: true,
	// 								confidence: true,
	// 								impact: true,
	// 								description: true,
	// 								start: true,
	// 								end: true,
	// 								data: true,
	// 								severityChanges: {
	// 									from: true,
	// 									to: true,
	// 									reason: true,
	// 								},
	// 								additionalData: {
	// 									title: true,
	// 									description: true,
	// 								},
	// 								governanceInfo: {
	// 									owners: {
	// 										type: true,
	// 										owner: true,
	// 										timelockDelay: true,
	// 									},
	// 									worstOwner: {
	// 										type: true,
	// 										owner: true,
	// 										timelockDelay: true,
	// 									},
	// 								},
	// 							},
	// 						},
	// 						implementationData: {
	// 							firstTxFrom: true,
	// 							firstTxDate: true,
	// 							firstTxBlock: true,
	// 							name: true,
	// 							initialFunder: true,
	// 							initialFunding: true,
	// 						},
	// 					},
	// 					diffs: {
	// 						id: true,
	// 						address: true,
	// 						network: true,
	// 						name: true,
	// 						projectName: true,
	// 						score: true,
	// 						createdAt: true,
	// 					},
	// 				},
	// 			],
	// 		});

	// 		adaptedSecurityResults = deFiAdapter({ response });
	// 		this.results.deFi = adaptedSecurityResults;
	// 	}

	// 	return adaptedSecurityResults;
	// }

	async start({ address }: { address: string }) {
		const goPlusSecurityAudit = await this.runGoPlusSecurityAudit({
			address,
		});
		// await this.runDeFiSecurityAudit({ address });

		const finalSecurityAudit = this.mergeSecurityAudits({
			goPlus: goPlusSecurityAudit,
		});

		this.finalSecurityAudit = finalSecurityAudit;

		return finalSecurityAudit;
	}

	mergeSecurityAudits({ goPlus }: { goPlus: ISecurityAudit }) {
		return mergeSecurityAudits({ goPlus });
	}

	displayResults() {
		if (this.finalSecurityAudit) {
			Object.keys(this.finalSecurityAudit).forEach((key) => {
				if (this.finalSecurityAudit) {
					const value = this.finalSecurityAudit[key];

					if (key === 'token') {
						console.log(key, value);
					}

					if (key === 'contract') {
						console.log(key);
						const contract = value as IContract;

						Object.keys(contract).forEach((key) => {
							const contractPropValue = contract[key];
							console.log(`  ${key}`);

							Object.keys(contractPropValue).forEach((key) => {
								const contractPropValueSet =
									contractPropValue[key];
								console.log(
									'  ',
									key,
									'  ',
									contractPropValueSet,
								);
							});
						});
					}
				}
			});
		}
	}
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
