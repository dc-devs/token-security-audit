import { ErrorMessage } from './common/enums';
import { goPlusAdapter } from './common/adapter';
import { GoPlus, ErrorCode } from '@goplus/sdk-node';
import { generateDefaultSecurityAudit } from '../../common/utils';

interface IOptions {
	chainId: string;
	address: string;
}

const runGoPlusSecurityAudit = async ({ chainId, address }: IOptions) => {
	const formattedAddress = address.toLowerCase();
	let adaptedSecurityAudit = generateDefaultSecurityAudit();

	// It will only return 1 result for the 1st token address if not called getAccessToken before
	const response = await GoPlus.tokenSecurity(
		chainId,
		[formattedAddress],
		30,
	);

	if (response.code != ErrorCode.SUCCESS) {
		console.error(response.message);
	} else {
		const securityResults = response.result[formattedAddress];

		if (securityResults) {
			adaptedSecurityAudit = goPlusAdapter({
				securityResults,
			});
		} else {
			console.error(ErrorMessage.NoResponse, response);
		}
	}

	return adaptedSecurityAudit;
};

export { runGoPlusSecurityAudit };
