interface IResult {
	[key: string]: Record<string, unknown> | boolean | number | null | any[];
	result: boolean | null;
	value: Record<string, unknown> | number | null;
	modifiable: boolean | null;
	deFiIssues: any[];
}

export { IResult };
