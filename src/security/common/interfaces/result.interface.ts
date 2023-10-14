interface IResult {
	[key: string]: boolean | number | null | any[];
	result: boolean | null;
	value: number | null;
	modifiable: boolean | null;
	deFiIssues: any[];
}

export { IResult };
