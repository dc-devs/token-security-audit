interface IAnalysis {
	highRiskCount: number;
	highRisk: Record<string, unknown>;
	mediumRiskCount: number;
	mediumRisk: Record<string, unknown>;
	lowRiskCount: number;
	lowRisk: Record<string, unknown>;
}

export { IAnalysis };
