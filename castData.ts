/**
 * Should transform data type of given value
 */
export const castData = (
	type: string,
	value: string,
): number | boolean | string | string[] => {
	// special rule
	if ((value === 'false' || value === 'true') && type === 'integer') {
		return value === 'false' ? 0 : 1
	}

	if (type === 'integer') {
		return parseInt(value, 10)
	}

	if (type === 'number') {
		return parseFloat(value)
	}

	if (type === 'boolean') {
		return value === 'true' || value === '1'
	}

	if (type === 'array') {
		return Object.values(value)
	}

	return value // string case
}
