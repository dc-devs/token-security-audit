import { mergeSecurityAudits } from './merge-security-audits';
import { ISecurityAudit, IContract } from './common/interfaces';

import {
	runDeFiSecurityAudit,
	runGoPlusSecurityAudit,
} from './security-audits';

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

	async runDeFiSecurityAudit({
		address,
	}: {
		address: string;
	}): Promise<ISecurityAudit> {
		return await runDeFiSecurityAudit({
			address,
			chainId: this.chainId,
		});
	}

	async start({ address }: { address: string }) {
		const goPlusSecurityAudit = await this.runGoPlusSecurityAudit({
			address,
		});
		const deFiSecurityAudit = await this.runDeFiSecurityAudit({ address });

		const finalSecurityAudit = this.mergeSecurityAudits({
			deFi: deFiSecurityAudit,
			goPlus: goPlusSecurityAudit,
		});

		this.finalSecurityAudit = finalSecurityAudit;

		return finalSecurityAudit;
	}

	mergeSecurityAudits({
		deFi,
		goPlus,
	}: {
		deFi: ISecurityAudit;
		goPlus: ISecurityAudit;
	}) {
		return mergeSecurityAudits({ deFi, goPlus });
	}

	displayResults() {
		console.log(this.finalSecurityAudit);
		// if (this.finalSecurityAudit) {
		// 	Object.keys(this.finalSecurityAudit).forEach((key) => {
		// 		if (this.finalSecurityAudit) {
		// 			const value = this.finalSecurityAudit[key];

		// 			if (key === 'token') {
		// 				console.log(key, value);
		// 			}

		// 			if (key === 'contract') {
		// 				console.log(key);
		// 				const contract = value as IContract;

		// 				Object.keys(contract).forEach((key) => {
		// 					const contractPropValue = contract[key];
		// 					console.log(`  ${key}`);

		// 					Object.keys(contractPropValue).forEach((key) => {
		// 						const contractPropValueSet =
		// 							contractPropValue[key];
		// 						console.log(
		// 							'  ',
		// 							key,
		// 							'  ',
		// 							contractPropValueSet,
		// 						);
		// 					});
		// 				});
		// 			}
		// 		}
		// 	});
	}
	// }
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
