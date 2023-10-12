import { deepCopy } from '../../common/utils/';
import { ISecurityAudit } from '../common/interfaces';
import { deFiContractProps } from './common/contract-props';

interface IOptions {
	deFi: ISecurityAudit;
	goPlus: ISecurityAudit;
}

// LEFT OFF:
// Merge Defi into final audit

// check if Defi audit has inProgress false, need too loop?
// ^^ any else we shouldd add?

// build analysis class to pull out relevant info for buying..
// build alert (text?) or auto buy tool?
// Scan dex tools too see if other strategies for picking up new tokens..

const mergeSecurityAudits = ({ deFi, goPlus }: IOptions): ISecurityAudit => {
	const target = {} as ISecurityAudit;
	const finalSecurityAudit = deepCopy(target, goPlus);
	const { contract: defiContract } = deFi;
	const { contract: finalContract } = finalSecurityAudit;

	// Updating by reference
	// Copy over desired defi props to final audit
	// if goplus is true, and defi is false, do nothing
	// if goplus is true, and defi is true, copy defi
	// if goplus is false, and defi false, copy defi
	// if goplus is false, defi is true, copy defi
	// so, copy all defi props unless (goplus is true, and defi is false, do nothing)
	deFiContractProps.forEach((deFiContractProp) => {
		const deFiContractResult = defiContract[deFiContractProp].result;
		const finalContractResult = finalContract[deFiContractProp].result;
		const deFiContractShouldOverride =
			!!(finalContractResult && deFiContractResult) ||
			!!(!finalContractResult && !deFiContractResult) ||
			!!(!finalContractResult && deFiContractResult);

		if (deFiContractShouldOverride) {
			finalContract[deFiContractProp] = defiContract[deFiContractProp];
		}
	});

	// return copy
	return finalSecurityAudit;
};

export { mergeSecurityAudits };
