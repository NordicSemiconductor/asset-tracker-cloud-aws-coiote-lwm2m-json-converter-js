import { convertValue } from './convertResource'

describe('convertValue', () => {
	it.each([
		['true', 'boolean', true],
		['false', 'boolean', false],
		['false', 'integer', 0], // special integer/boolean case
		['true', 'integer', 1], // special integer/boolean case
		['hello world', 'string', 'hello world'],
		['10', 'number', 10],
		['100', 'integer', 100],
		['1970-01-01T00:00:00Z', 'timestamp', 0],
		['', '', null],
	])(
		"should convert value: '%s' which is type: '%s' to: %s",
		(value, type: any, expected) =>
			expect(convertValue(value, type)).toEqual(expected),
	)
})
