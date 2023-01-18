import { castData } from './castData'

describe('castData', () => {
	it.each([
		['false', 'integer', 0],
		['true', 'integer', 1],
		['10', 'integer', 10],
		['10', 'number', 10],
		['true', 'boolean', true],
		['false', 'boolean', false],
		['hi', 'string', 'hi'],
		//["[1,2,3]","array", [1,2,3]] // FIX ME
	])(
		'Should cast data. Value: %s Type: %s Result: %s ',
		(value, type, expected) => {
			expect(castData(type, value)).toBe(expected)
		},
	)
})
