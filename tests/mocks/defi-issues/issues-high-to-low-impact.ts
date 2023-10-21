import { IIssue } from '../../../src/security/security-audits/de-fi/common/adapter/common/interfaces/issue.interface';

const isssuesHighToLowImpact: IIssue[] = [
	{
		id: 95775903,
		confidence: 'High',
		impact: 'Critical',
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
		confidence: 'High',
		impact: 'High',
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
		confidence: 'High',
		impact: 'Medium',
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
		confidence: 'High',
		impact: 'Low',
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
		confidence: 'High',
		impact: 'Informational',
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
