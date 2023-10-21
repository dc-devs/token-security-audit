import {
	Impact,
	Confidence,
} from '../../security-audits/de-fi/common/adapter/common/enums';

interface IResult {
	[key: string]:
		| Record<string, unknown>
		| string
		| boolean
		| number
		| null
		| any[];
	result: boolean | null;
	value: Record<string, unknown> | number | null;
	modifiable: boolean | null;
	impact: Impact | null;
	confidence: Confidence | null;
	deFiIssues: any[];
}

export { IResult };
