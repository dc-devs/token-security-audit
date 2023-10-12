// Chat GPT Copy/Pasta
function deepCopy<T>(target: T, source: T): T {
	if (source === null || typeof source !== 'object') {
		return source;
	}

	if (Array.isArray(source)) {
		(target as any) = [];
		for (let i = 0; i < (source as any[]).length; i++) {
			(target as any[])[i] = deepCopy(
				(target as any[])[i] || {},
				(source as any[])[i],
			);
		}
	} else {
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				if (typeof source[key] === 'object' && source[key] !== null) {
					(target as any)[key] = Array.isArray(source[key]) ? [] : {};
					deepCopy((target as any)[key], source[key]);
				} else {
					(target as any)[key] = source[key];
				}
			}
		}
	}

	return target;
}

export { deepCopy };
