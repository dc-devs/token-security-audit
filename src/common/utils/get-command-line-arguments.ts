interface IParsedArguments {
	[key: string]: string;
}

const getCommandLineArguments = () => {
	const parsedArguments: IParsedArguments = {};
	const cliArguments = process.argv.slice(2);

	cliArguments.forEach((argument) => {
		const parts = argument.replace('--', '').split('=');
		const key = parts[0];
		const value = parts[1];

		parsedArguments[key] = value;
	});

	return parsedArguments;
};

export { getCommandLineArguments };
