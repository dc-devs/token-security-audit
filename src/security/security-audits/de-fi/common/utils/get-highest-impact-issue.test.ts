import { IIssue } from '../interfaces';
import { Impact, Confidence } from '../enums';
import { getHighestImpactIssue } from './get-highest-impact-issue';
import {
	isssuesMixedImpact,
	isssuesLowToHighImpact,
	isssuesHighToLowImpact,
} from '../../../../../../tests/mocks/defi-issues';

describe('getHighestImpactIssue', () => {
	describe('when issues are ordered from high to low criticality', () => {
		let issue: IIssue | null;

		beforeEach(() => {
			issue = getHighestImpactIssue({ issues: isssuesHighToLowImpact });
		});

		test(`should return issue with impact ${Impact.Critical}`, () => {
			expect(issue?.impact).toEqual(Impact.Critical);
		});
		test(`should return issue with confidence ${Confidence.High}`, () => {
			expect(issue?.confidence).toEqual(Confidence.High);
		});
	});

	describe('when issues are ordered from low to high criticality', () => {
		let issue: IIssue | null;

		beforeEach(() => {
			issue = getHighestImpactIssue({ issues: isssuesLowToHighImpact });
		});

		test(`should return issue with impact ${Impact.Critical}`, () => {
			expect(issue?.impact).toEqual(Impact.Critical);
		});

		test(`should return issue with confidence ${Confidence.High}`, () => {
			expect(issue?.confidence).toEqual(Confidence.High);
		});
	});

	describe('when issues are ordered with mixed criticality', () => {
		let issue: IIssue | null;

		beforeEach(() => {
			issue = getHighestImpactIssue({ issues: isssuesMixedImpact });
		});

		test(`should return issue with impact ${Impact.Critical}`, () => {
			expect(issue?.impact).toEqual(Impact.Critical);
		});

		test(`should return issue with confidence ${Confidence.High}`, () => {
			expect(issue?.confidence).toEqual(Confidence.High);
		});
	});

	describe('when issues are empty', () => {
		let issue: IIssue | null;

		beforeEach(() => {
			issue = getHighestImpactIssue({ issues: [] });
		});

		test('should return issue with impact undefined', () => {
			expect(issue?.impact).toBeUndefined();
		});

		test('should return issue with confidence undefined', () => {
			expect(issue?.confidence).toBeUndefined();
		});
	});
});
