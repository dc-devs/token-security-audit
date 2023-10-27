import { Impact } from '../security-audits/de-fi/common/enums';
import { ISecurityAudit, IAnalysis } from '../common/interfaces';

interface IOptions {
	securityAudit: ISecurityAudit;
}

const analyzeSecurityAudit = ({ securityAudit }: IOptions) => {
	const analysis = {
		purchase: {
			isSafe: null,
			needsManualReview: null,
		},
		risk: {
			criticalCount: 0,
			highCount: 0,
			mediumCount: 0,
			lowCount: 0,
			informationalCount: 0,
			critical: {},
			high: {},
			medium: {},
			low: {},
			informational: {},
		},
	} as IAnalysis;
	const { contract } = securityAudit;

	Object.keys(contract).forEach((contractPropName) => {
		const contractPropValue = contract[contractPropName];

		if (contractPropValue.impact === Impact.Critical) {
			analysis.risk.critical[contractPropName] = contractPropValue;
			analysis.risk.criticalCount += 1;
		}

		if (contractPropValue.impact === Impact.High) {
			analysis.risk.high[contractPropName] = contractPropValue;
			analysis.risk.highCount += 1;
		}

		if (contractPropValue.impact === Impact.Medium) {
			analysis.risk.medium[contractPropName] = contractPropValue;
			analysis.risk.mediumCount += 1;
		}

		if (contractPropValue.impact === Impact.Low) {
			analysis.risk.low[contractPropName] = contractPropValue;
			analysis.risk.lowCount += 1;
		}

		if (contractPropValue.impact === Impact.Informational) {
			analysis.risk.low[contractPropName] = contractPropValue;
			analysis.risk.informationalCount += 1;
		}
	});

	if (analysis.risk.criticalCount > 0 || analysis.risk.highCount > 0) {
		analysis.purchase.isSafe = false;
	} else {
		analysis.purchase.isSafe = true;
	}

	if (
		analysis.risk.criticalCount > 0 ||
		analysis.risk.highCount > 0 ||
		analysis.risk.mediumCount > 0
	) {
		analysis.purchase.needsManualReview = true;
	}

	return analysis;
};

export { analyzeSecurityAudit };
