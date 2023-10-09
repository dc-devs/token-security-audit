import { createClient } from '@de-fi/sdk';
import { Url, Header } from '../enums';

const getDeFiClient = () => {
	const defiApiKey = process.env.DEFI_API_KEY;
	let deFiClient;

	if (defiApiKey) {
		deFiClient = createClient({
			url: Url.DefiGraphQlBase,
			headers: { [Header.XApiKey]: defiApiKey },
		});
	}

	return deFiClient;
};

export { getDeFiClient };
