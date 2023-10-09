import { ISecurityAudit } from '../common/interfaces';

interface IOptions {
	deFi: ISecurityAudit;
	goPlus: ISecurityAudit;
}

const mergeSecurityAudits = ({ deFi, goPlus }: IOptions): ISecurityAudit => {
	const finalSecurityAudit = { ...goPlus };

	return finalSecurityAudit;
};

export { mergeSecurityAudits };
