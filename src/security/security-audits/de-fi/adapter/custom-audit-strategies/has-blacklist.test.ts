import { hasBlacklist } from './has-blacklist';
import { Impact, Confidence } from '../../common/enums';
import { IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
import { hasBlacklistIssues } from '../../../../../../tests/mocks/defi-issues';

describe('hasBlacklist', () => {
	describe('when called with a list of list of isuees ', () => {
		let contract: IContract;

		beforeEach(() => {
			contract = generateDefaultSecurityAudit().contract;

			hasBlacklist({
				contract,
				key: 'hasBlackList',
				issues: hasBlacklistIssues,
			});
		});

		test('should update contract as expected', () => {
			const { result, value, impact, confidence, modifiable } =
				contract.hasBlackList;

			expect(result).toBe(true);
			expect(value).toEqual(
				expect.arrayContaining([
					{
						type: 'function',
						value: 'owner',
						modifiable: true,
					},
				]),
			);
			expect(impact).toBe(Impact.Critical);
			expect(confidence).toBe(Confidence.High);
			expect(modifiable).toBe(true);
		});
	});
});
