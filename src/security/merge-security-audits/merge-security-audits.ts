import { ISecurityAudit } from '../common/interfaces';
import { Defaults } from '../../common/util-classes/defaults';

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
	let newSecurityAudit = Defaults.generateDefaultSecurityAudit();

	// const finalSecurityAudit = { ...goPlus };

	console.log('--------------');
	console.log('"NEW" Security Audit');
	Object.keys(newSecurityAudit.contract).forEach((contractPropKey) => {
		const contractPropValue = newSecurityAudit.contract[contractPropKey];
		console.log(contractPropKey, contractPropValue);
	});
	console.log('--------------');

	// console.log('--------------');
	// console.log('goPlus Security Audit');
	// Object.keys(goPlus.contract).forEach((contractPropKey) => {
	// 	const contractPropValue = goPlus.contract[contractPropKey];
	// 	console.log(contractPropKey, contractPropValue);
	// });
	// console.log('--------------');

	return newSecurityAudit;
};

export { mergeSecurityAudits };
