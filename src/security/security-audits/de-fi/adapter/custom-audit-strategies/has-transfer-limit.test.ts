import { expect } from 'expect';
import { IValue } from '../../common/interfaces';
import { hasTransferLimit } from './has-transfer-limit';
import { Impact, Confidence } from '../../common/enums';
import { IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
import { hasTransferLimitIssues } from '../../../../../../tests/mocks/defi-issues';

describe('hasTransferLimit', () => {
	describe('when called with a list of list of isuees ', () => {
		let contract: IContract;

		beforeAll(() => {
			contract = { ...generateDefaultSecurityAudit().contract };

			hasTransferLimit({
				contract,
				key: 'hasTransferLimit',
				issues: hasTransferLimitIssues,
			});
		});

		test('should update contract as expected', () => {
			const { result, value, impact, confidence, modifiable } =
				contract.hasTransferLimit;
			const expectedValue = value as Record<string, IValue>;

			expect(result).toBe(true);
			expect(impact).toBe(Impact.Medium);
			expect(confidence).toBe(Confidence.High);
			expect(modifiable).toBe(false);
			expect(expectedValue).toEqual(
				expect.objectContaining({
					upper: 420000,
					lower: null,
				}),
			);
		});
	});
});
