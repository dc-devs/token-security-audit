interface IResult {
	[key: string]: boolean | null | any[];
	result: boolean | null;
	issues: any[];
}

export { IResult };
