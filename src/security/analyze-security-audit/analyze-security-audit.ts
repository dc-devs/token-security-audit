import { ISecurityAudit } from '../common/interfaces';

interface IOptions {
	securityAudit: ISecurityAudit;
}

interface IAnalysis {
	[key: string]: any;
}

const analyzeSecurityAudit = ({ securityAudit }: IOptions) => {
	const analysis = {} as IAnalysis;
	const { contract } = securityAudit;

	Object.keys(contract).forEach((contractPropName) => {
		const contractProperty = contract[contractPropName];

		if (contractProperty.result) {
			const { issues } = contractProperty;
			analysis[contractPropName] = issues;
		}
	});

	return analysis;
};

export { analyzeSecurityAudit };
