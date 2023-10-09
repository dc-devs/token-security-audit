import { deFiAdapter } from './common/adapter';
import { getDeFiClient } from './common/utils';
import { scannerProjectSchema } from './common/schemas';
import { Defaults } from '../../../common/util-classes/defaults';

interface IOptions {
	chainId: string;
	address: string;
}

const runDeFiSecurityAudit = async ({ chainId, address }: IOptions) => {
	const deFiClient = getDeFiClient();
	const formattedAddress = address.toLowerCase();
	let adaptedSecurityResults = Defaults.generateDefaultSecurityResults();

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

		adaptedSecurityResults = deFiAdapter({ response });
	}

	return adaptedSecurityResults;
};

export { runDeFiSecurityAudit };
