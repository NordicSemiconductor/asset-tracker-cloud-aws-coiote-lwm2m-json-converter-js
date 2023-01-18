import { isNotProvidedValue } from './isNotProvidedValue'

describe('isNotProvidedValue', () => {
	it.only.each([
		[{ noValue: true }, true],
		[{ prop: '' }, false],
		[{ prop: {} }, false],
		[{ SMNC: '1' }, false],
		[{ 'Router IP Addresses': {} }, false],
		[{}, true],
		['value', false],
	])('Should return resource (%s) type: %s ', (value, expected) => {
		expect(isNotProvidedValue(value)).toBe(expected)
	})
})
