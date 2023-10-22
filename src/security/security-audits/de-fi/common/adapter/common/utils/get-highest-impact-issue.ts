import { IIssue } from '../interfaces';
import { Impact } from '../../../enums';

type IReturn = IIssue | null;

interface IOptions {
	issues: IIssue[];
}

const getHighestImpactIssue = ({ issues }: IOptions): IReturn => {
	let highestImpactIssue: IIssue | null = null;

	if (Array.isArray(issues) && issues.length > 0) {
		issues.forEach((issue) => {
			const issueImpact = issue.impact;

			// TODO: Would cause override if 2 Critical issues
			// Probably OK for now
			if (issueImpact === Impact.Critical) {
				highestImpactIssue = issue;
			}

			if (
				issueImpact === Impact.High &&
				highestImpactIssue?.impact !== Impact.Critical
			) {
				highestImpactIssue = issue;
			}

			if (
				issueImpact === Impact.Medium &&
				highestImpactIssue?.impact !== Impact.Critical &&
				highestImpactIssue?.impact !== Impact.High
			) {
				highestImpactIssue = issue;
			}

			if (
				issueImpact === Impact.Low &&
				highestImpactIssue?.impact !== Impact.Critical &&
				highestImpactIssue?.impact !== Impact.High &&
				highestImpactIssue?.impact !== Impact.Medium
			) {
				highestImpactIssue = issue;
			}

			if (
				issueImpact === Impact.Informational &&
				highestImpactIssue?.impact !== Impact.Critical &&
				highestImpactIssue?.impact !== Impact.High &&
				highestImpactIssue?.impact !== Impact.Medium &&
				highestImpactIssue?.impact !== Impact.Low
			) {
				highestImpactIssue = issue;
			}
		});
	}

	return highestImpactIssue;
};

export { getHighestImpactIssue };
