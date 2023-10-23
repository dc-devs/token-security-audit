import { IValue } from '../../security-audits/de-fi/common/interfaces';
import { Impact, Confidence } from '../../security-audits/de-fi/common/enums';

interface IResult {
	[key: string]:
		| Record<string, unknown>
		| string
		| boolean
		| number
		| null
		| any[]
		| IValue
		| IValue[];
	result: boolean | null;
	value: Record<string, unknown> | string | number | IValue | IValue[] | null;
	modifiable: boolean | null;
	impact: Impact | null;
	confidence: Confidence | null;
	deFiIssues: any[];
}

export { IResult };
