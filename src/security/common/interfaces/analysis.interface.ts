interface IPurchase {
	isSafe: boolean;
	needsManualReview: boolean;
}

interface IRisk {
	highCount: number;
	high: Record<string, unknown>;
	mediumCount: number;
	medium: Record<string, unknown>;
	lowCount: number;
	lowRisk: Record<string, unknown>;
}

interface IAnalysis {
	risk: IRisk;
	purchase: IPurchase;
}

export { IAnalysis };
