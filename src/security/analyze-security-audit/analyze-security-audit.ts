import { ISecurityAudit, IAnalysis } from '../common/interfaces';

// Just for catagorizing
//-------------------------------
interface IHighRiskIssues {
	[key: string]: boolean;
	hasReentrancy: boolean;
}

const highRiskIssues: IHighRiskIssues = {
	hasReentrancy: true,
};

interface IMediumRiskIssues {
	[key: string]: boolean;
}

const mediumRiskIssues: IMediumRiskIssues = {};

interface ILowRiskIssues {
	[key: string]: boolean;
}

const lowRiskIssues: ILowRiskIssues = {};
//-------------------------------

interface IOptions {
	securityAudit: ISecurityAudit;
}

const analyzeSecurityAudit = ({ securityAudit }: IOptions) => {
	const analysis = {
		highRiskCount: 0,
		highRisk: {},
		mediumRiskCount: 0,
		mediumRisk: {},
		lowRiskCount: 0,
		lowRisk: {},
	} as IAnalysis;
	const { contract } = securityAudit;

	Object.keys(contract).forEach((contractPropName) => {
		const contractPropertyValue = contract[contractPropName];

		if (highRiskIssues[contractPropName] && contractPropertyValue.result) {
			analysis.highRisk[contractPropName] = contractPropertyValue;
			analysis.highRiskCount += 1;
		}

		if (
			mediumRiskIssues[contractPropName] &&
			contractPropertyValue.result
		) {
			analysis.mediumRisk[contractPropName] = contractPropertyValue;
			analysis.mediumRiskCount += 1;
		}

		if (lowRiskIssues[contractPropName] && contractPropertyValue.result) {
			analysis.lowRisk[contractPropName] = contractPropertyValue;
			analysis.lowRiskCount += 1;
		}
	});

	return analysis;
};

export { analyzeSecurityAudit };
