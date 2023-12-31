import { expect } from 'expect';
import { hasBlacklist } from './has-blacklist';
import { IValue } from '../../common/interfaces';
import { Impact, Confidence } from '../../common/enums';
import { IContract } from '../../../../common/interfaces';
import { generateDefaultSecurityAudit } from '../../../../common/utils';
import { hasBlacklistIssues } from '../../../../../../tests/mocks/defi-issues';

describe('hasBlacklist', () => {
	describe('when called with a list of list of isuees ', () => {
		let contract: IContract;

		beforeAll(() => {
			contract = { ...generateDefaultSecurityAudit().contract };

			hasBlacklist({
				contract,
				key: 'hasBlackList',
				issues: hasBlacklistIssues,
			});
		});

		test('should update contract as expected', () => {
			const { result, value, impact, confidence, modifiable } =
				contract.hasBlackList;
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
				}),
			);
		});
	});
});
