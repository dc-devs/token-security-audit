import { IIssue } from '../../../src/security/security-audits/de-fi/common/interfaces';
import {
	Impact,
	Confidence,
} from '../../../src/security/security-audits/de-fi/common/enums';

const hasBlacklistIssues: IIssue[] = [
	{
		id: 95775865,
		confidence: Confidence.High,
		impact: Impact.Critical,
		description:
			'Blacklisted function: BETETF.transfer(address,uint256) (BETETF.sol#534-536)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression require(bool)(! bots[sender] && ! bots[recipient])\n',
		start: 534,
		end: 536,
		data: '{"privileged": [{"type": "function", "value": "owner", "modifiable": true}]}',
		severityChanges: [],
		additionalData: [],
		governanceInfo: {
			owners: [
				{
					type: '6',
					owner: '0xa7d27a7D1D6e0bA053b80BE7344D641409673F05',
					timelockDelay: null,
				},
			],
			worstOwner: {
				type: '6',
				owner: '0xa7d27a7D1D6e0bA053b80BE7344D641409673F05',
				timelockDelay: null,
			},
		},
	},
	{
		id: 95775866,
		confidence: Confidence.High,
		impact: Impact.Critical,
		description:
			'Blacklisted function: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- in internal call: BETETF._transfer(address,address,uint256) (BETETF.sol#546-577)\n\t\t- in expression require(bool)(! bots[sender] && ! bots[recipient])\n',
		start: 538,
		end: 544,
		data: '{"privileged": [{"type": "function", "value": "owner", "modifiable": true}]}',
		severityChanges: [],
		additionalData: [],
		governanceInfo: {
			owners: [
				{
					type: '6',
					owner: '0xa7d27a7D1D6e0bA053b80BE7344D641409673F05',
					timelockDelay: null,
				},
			],
			worstOwner: {
				type: '6',
				owner: '0xa7d27a7D1D6e0bA053b80BE7344D641409673F05',
				timelockDelay: null,
			},
		},
	},
];

export { hasBlacklistIssues };
