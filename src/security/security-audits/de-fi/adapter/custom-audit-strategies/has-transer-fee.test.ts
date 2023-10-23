import { expect } from 'expect';
import { IValue } from '../../common/interfaces';
import { hasTransferFee } from './has-transfer-fee';
import { Impact, Confidence } from '../../common/enums';
import { IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
import { hasTransferFeeIssues } from '../../../../../../tests/mocks/defi-issues';

describe('hasTransferFee', () => {
	describe('when called with a list of list of isuees ', () => {
		let contract: IContract;

		beforeEach(() => {
			contract = generateDefaultSecurityAudit().contract;

			hasTransferFee({
				contract,
				key: 'hasTransferFee',
				issues: hasTransferFeeIssues,
			});
		});

		test('should update contract as expected', () => {
			const { result, value, impact, confidence, modifiable } =
				contract.hasTransferFee;
			const expectedValue = value as Record<string, IValue>;

			expect(result).toBe(true);
			expect(impact).toBe(Impact.Critical);
			expect(confidence).toBe(Confidence.High);
			expect(modifiable).toBe(true);
			expect(expectedValue).toEqual(
				expect.objectContaining({
					privileged: expect.arrayContaining([
						expect.objectContaining({
							type: 'function',
							value: 'owner',
							modifiable: true,
						}),
					]),
					transferFeeLimits: expect.objectContaining({
						upper: 1,
						lower: null,
					}),
					transferFee: expect.objectContaining({
						buyer: 0,
						seller: 0,
					}),
					modifiable: true,
				}),
			);
		});
	});
});
