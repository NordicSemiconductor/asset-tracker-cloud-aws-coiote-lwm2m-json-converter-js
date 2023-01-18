import { resourceNameToUrn } from './resourceNameToUrn'

describe('resourceNameToUrn()', () => {
	it.each([
		['Connectivity Monitoring', '4:1.3@1.1'], // ConnectivityMonitoring_4_urn
		['Humidity', '3304:1.1'], // Humidity_3304_urn
		// Special case, because of conflict
		['Location', '6'], // Location_6_urn
	])(
		`should convert the resource name "%s" to the URN "%s"`,
		(resourceName, expectedURN) =>
			expect(resourceNameToUrn(resourceName)).toEqual(expectedURN),
	)

	it('should return null for unknown objects', () =>
		expect(resourceNameToUrn('foo')).toBeNull())
})
