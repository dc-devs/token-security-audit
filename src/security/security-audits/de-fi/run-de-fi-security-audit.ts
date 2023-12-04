import { deFiAdapter } from './adapter/de-fi.adapter';
import { getDeFiClient } from './common/utils';
import { scannerProjectSchema } from './common/schemas';
import { generateDefaultSecurityAudit } from '../../common/utils';

interface IOptions {
	chainId: string;
	address: string;
}

const runDeFiSecurityAudit = async ({ chainId, address }: IOptions) => {
	const deFiClient = getDeFiClient();
	const formattedAddress = address.toLowerCase();
	let adaptedSecurityAudit = generateDefaultSecurityAudit();

	if (deFiClient) {
		const response = await deFiClient.query({
			scannerProject: [
				{
					where: {
						chainId: Number(chainId),
						address: formattedAddress,
					},
				},
				scannerProjectSchema,
			],
		});

		adaptedSecurityAudit = deFiAdapter({ response });
	} else {
		throw new Error('DeFi Client failed to initialize');
	}

	return adaptedSecurityAudit;
};

export { runDeFiSecurityAudit };
