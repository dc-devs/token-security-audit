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
	finalAnalysis?: IAnalysis;
	finalSecurityAudit?: ISecurityAudit;
	finalResults?: Record<string, unknown>;

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

	generateFinalResults({
		finalAnalysis,
		finalSecurityAudit,
	}: {
		finalAnalysis?: IAnalysis;
		finalSecurityAudit?: ISecurityAudit;
	}): Record<string, unknown> {
		const finalResults = {
			token: finalSecurityAudit?.token,
			purchase: finalAnalysis?.purchase,
			owner: finalSecurityAudit?.owner,
			creator: finalSecurityAudit?.creator,
			dexData: finalSecurityAudit?.dexData,
			liquidityProvider: finalSecurityAudit?.liquidityProvider,
			holders: finalSecurityAudit?.holders,
			other: finalSecurityAudit?.other,
			risk: finalAnalysis?.risk,
		};

		return finalResults;
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

		const finalResults = this.generateFinalResults({
			finalAnalysis: finalAnalysis,
			finalSecurityAudit: finalSecurityAudit,
		});

		this.finalSecurityAudit = finalSecurityAudit;
		this.finalAnalysis = finalAnalysis;
		this.finalResults = finalResults;

		return finalResults;
	}

	displayResults() {
		console.log(this.finalResults);

		console.log('');
		console.log('-----------------');
		console.log('Detailed Risk');
		console.log('-----------------');
		console.log(this.finalAnalysis?.purchase);
		console.log(this.finalAnalysis?.risk);

		// if (this.finalAnalysis?.risk?.critical) {
		// 	Object.keys(this.finalAnalysis?.risk?.critical).forEach(
		// 		(criticalIssueName) => {
		// 			const criticalIssue =
		// 				this.finalAnalysis?.risk?.critical[criticalIssueName];

		// 			console.log(criticalIssue?.value?.privileged);
		// 			console.log(criticalIssue?.deFiIssues[0].additionalData);
		// 		},
		// 	);
		// }
	}
}

export { Security };

// https://de.fi/scanner/contract/0x75c97384ca209f915381755c582ec0e2ce88c1ba?1
