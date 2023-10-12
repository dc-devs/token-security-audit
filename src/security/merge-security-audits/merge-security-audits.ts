import { ISecurityAudit } from '../common/interfaces';

interface IOptions {
	deFi: ISecurityAudit;
	goPlus: ISecurityAudit;
}

// LEFT OFF:
// Merge Defi into final audit

// check if Defi audit has inProogrress false, need too loop?
// ^^ any else we shouldd add?
// Scan dex tools too see if other strategies for picking up new tokens..

// build analysis class to pull out relevant info for buying..
// build alert (text?) or auto buy tool?

const mergeSecurityAudits = ({ deFi, goPlus }: IOptions): ISecurityAudit => {
	return { deFi, goPlus };
};

export { mergeSecurityAudits };
