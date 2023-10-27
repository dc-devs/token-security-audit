interface IPurchase {
	isSafe: boolean | null;
	needsManualReview: boolean | null;
}

interface IRisk {
	criticalCount: number;
	highCount: number;
	mediumCount: number;
	lowCount: number;
	informationalCount: number;
	critical: Record<string, unknown>;
	high: Record<string, unknown>;
	medium: Record<string, unknown>;
	low: Record<string, unknown>;
	informational: Record<string, unknown>;
}

interface IAnalysis {
	risk: IRisk;
	purchase: IPurchase;
}

export { IAnalysis };
