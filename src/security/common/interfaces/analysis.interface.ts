interface IPurchase {
	isSafe: boolean | null;
	needsManualReview: boolean | null;
}

interface IRisk {
	criticalCount: number;
	highCount: number;
	mediumCount: number;
	lowCount: number;
	informationCount: number;
	critical: Record<string, unknown>;
	high: Record<string, unknown>;
	medium: Record<string, unknown>;
	low: Record<string, unknown>;
	information: Record<string, unknown>;
}

interface IAnalysis {
	risk: IRisk;
	purchase: IPurchase;
}

export { IAnalysis };
