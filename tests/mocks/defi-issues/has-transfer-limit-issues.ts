import { IIssue } from '../../../src/security/security-audits/de-fi/common/interfaces';
import {
	Impact,
	Confidence,
} from '../../../src/security/security-audits/de-fi/common/enums';

const hasTransferLimitIssues: IIssue[] = [
	{
		id: 95775899,
		confidence: Confidence.High,
		impact: Impact.Medium,
		description:
			'Transfer amount limits in: BETETF.transfer(address,uint256) (BETETF.sol#534-536)\n\t- In expression: _balances[recipient].add(amount) <= maxWallet \n\t- In expression: amount <= maxTx || isTxLimitExempt[sender] \n\t- In expression: amount <= maxTx \n',
		start: 534,
		end: 536,
		data: '{"transferAmountLimits":{"upper":420000,"lower":null}}',
		severityChanges: [
			{
				from: 'Critical',
				to: 'Medium',
				reason: 'Transfer Limit is bigger than 1% of total supply, but can be changed',
			},
		],
		additionalData: [
			{
				title: 'Transfer Amount Limits',
				description:
					'Maximum transfer amount: 2% of total supply (420K ETF).\nMinimum transfer amount not found.',
			},
		],
		governanceInfo: null,
	},
	{
		id: 95775900,
		confidence: Confidence.High,
		impact: Impact.Medium,
		description:
			'Transfer amount limits in: BETETF.transferFrom(address,address,uint256) (BETETF.sol#538-544)\n\t- In expression: _balances[recipient].add(amount) <= maxWallet \n\t- In expression: amount <= maxTx || isTxLimitExempt[sender] \n\t- In expression: amount <= maxTx \n',
		start: 538,
		end: 544,
		data: '{"transferAmountLimits":{"upper":420000,"lower":null}}',
		severityChanges: [
			{
				from: 'Critical',
				to: 'Medium',
				reason: 'Transfer Limit is bigger than 1% of total supply, but can be changed',
			},
		],
		additionalData: [
			{
				title: 'Transfer Amount Limits',
				description:
					'Maximum transfer amount: 2% of total supply (420K ETF).\nMinimum transfer amount not found.',
			},
		],
		governanceInfo: null,
	},
];

export { hasTransferLimitIssues };
