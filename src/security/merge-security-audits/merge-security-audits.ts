import { ISecurityAudit } from '../common/interfaces';

interface IOptions {
	goPlus: ISecurityAudit;
}

const mergeSecurityAudits = ({ goPlus }: IOptions): ISecurityAudit => {
	const finalSecurityAudit = { ...goPlus };

	return finalSecurityAudit;
};

export { mergeSecurityAudits };
