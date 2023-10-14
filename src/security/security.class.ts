import { ISecurityAudit, IAnalysis } from './common/interfaces';
import { mergeSecurityAudits } from './merge-security-audits';
import { analyzeSecurityAudit } from './analyze-security-audit';
import {
	runDeFiSecurityAudit,
	runGoPlusSecurityAudit,
} from './security-audits';

interface IConstructorOptions {
	chainId: string;
}

class Security {
	chainId: string;
	finalAnalysis: any;
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

	mergeSecurityAudits({
		deFi,
		goPlus,
	}: {
		deFi: ISecurityAudit;
		goPlus: ISecurityAudit;
	}) {
		return mergeSecurityAudits({ deFi, goPlus });
	}

	analyzeSecurityAudit({
		securityAudit,
	}: {
		securityAudit: ISecurityAudit;
	}): IAnalysis {
		return analyzeSecurityAudit({ securityAudit });
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
		const finalAnalysis = this.analyzeSecurityAudit({
			securityAudit: finalSecurityAudit,
		});

		this.finalSecurityAudit = finalSecurityAudit;
		this.finalAnalysis = finalAnalysis;

		return finalSecurityAudit;
	}

	displayResults() {
		// console.log(this.finalSecurityAudit);
		// console.log('');
		Object.keys(this.finalAnalysis).forEach((key) => {
			const value = this.finalAnalysis[key];

			console.log(key, value);
		});
	}
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
