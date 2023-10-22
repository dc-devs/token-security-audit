import { IIssue } from '../../../src/security/security-audits/de-fi/common/interfaces';
import {
	Impact,
	Confidence,
} from '../../../src/security/security-audits/de-fi/common/enums';

const isssuesHighToLowImpact: IIssue[] = [
	{
		id: 95775903,
		confidence: Confidence.High,
		impact: Impact.Critical,
		description:
			'whitelisted function: BETETF.transfer(address,uint256) (BETETF.sol#534-536)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression ! isDividendExempt[sender]\n',
		start: 534,
		end: 536,
		data: '',
		severityChanges: [],
		additionalData: [],
		governanceInfo: null,
	},
	{
		id: 95775904,
		confidence: Confidence.High,
		impact: Impact.High,
		description:
			'whitelisted function: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression ! isDividendExempt[sender]\n',
		start: 538,
		end: 544,
		data: '',
		severityChanges: [],
		additionalData: [],
		governanceInfo: null,
	},
	{
		id: 95775904,
		confidence: Confidence.High,
		impact: Impact.Medium,
		description:
			'whitelisted function: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression ! isDividendExempt[sender]\n',
		start: 538,
		end: 544,
		data: '',
		severityChanges: [],
		additionalData: [],
		governanceInfo: null,
	},
	{
		id: 95775904,
		confidence: Confidence.High,
		impact: Impact.Low,
		description:
			'whitelisted function: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression ! isDividendExempt[sender]\n',
		start: 538,
		end: 544,
		data: '',
		severityChanges: [],
		additionalData: [],
		governanceInfo: null,
	},
	{
		id: 95775904,
		confidence: Confidence.High,
		impact: Impact.Informational,
		description:
			'whitelisted function: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression ! isDividendExempt[sender]\n',
		start: 538,
		end: 544,
		data: '',
		severityChanges: [],
		additionalData: [],
		governanceInfo: null,
	},
];

export { isssuesHighToLowImpact };
