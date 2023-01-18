import type { Value } from './convert'

/**
 *
 * Return true if the value is clasificaded as "no provided"
 *
 *   No value --> {"noValue": true}
 *   Empty string --> {prop: ""}
 *   Empty object --> {prop: {}}
 */
export const isNotProvidedValue = (value: Value): boolean => {
	// ""
	if (value === '') return true

	if (typeof value === 'object') {
		// {prop: {}}
		if (Object.keys(value).length === 0) return true

		// {prop: {noValue: true}}
		if ('noValue' in value && value.noValue === true) return true
	}
	return false
}
