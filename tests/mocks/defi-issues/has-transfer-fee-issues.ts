import { IIssue } from '../../../src/security/security-audits/de-fi/common/interfaces';
import {
	Impact,
	Confidence,
} from '../../../src/security/security-audits/de-fi/common/enums';

const hasTransferFeeIssues: IIssue[] = [
	{
		id: 95775896,
		confidence: Confidence.High,
		impact: Impact.Critical,
		description:
			'Transfer Fee: BETETF.transfer(address,uint256) (BETETF.sol#534-536)\n\t- in nested function: takeFee\n\t\t- in expression: amount.mul(feeApplicable).div(1000)\n\t\t- in expression: if pair == recipient then sellFee else buyFee\n',
		start: 534,
		end: 536,
		data: '{"privileged":[{"type":"function","value":"owner","modifiable":true}],"transferFeeLimits":{"upper":1,"lower":null},"transferFee":[{"value":0,"variable":"sellFee"},{"value":0,"variable":"buyFee"}],"modifiable":true}',
		severityChanges: [],
		additionalData: [
			{
				title: 'Transfer Fee Limits',
				description:
					'Current transfer fee upper limit is: 100%.\nLower limit not found.',
			},
			{
				title: 'Current fee',
				description: 'sellFee: 0%,buyFee: 0%. Fee is modifiable.',
			},
		],
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

export { hasTransferFeeIssues };
