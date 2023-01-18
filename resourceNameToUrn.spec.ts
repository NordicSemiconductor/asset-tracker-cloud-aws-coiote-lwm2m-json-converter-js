import { resourceNameToUrn } from './resourceNameToUrn'

describe('resourceNameToUrn()', () => {
	it.each([
		['Connectivity Monitoring', '4:1.3@1.1'], // ConnectivityMonitoring_4_urn
		['Humidity', '3304:1.1'], // Humidity_3304_urn
		// Special case, because of conflict
		['Location', '6'], // Location_6_urn
		['Location Assistance', null], // not a LwM2M resource
	])(
		`should convert the resource name "%s" to the URN "%s"`,
		(resourceName, expectedURN) =>
			expect(resourceNameToUrn(resourceName)).toEqual(expectedURN),
	)
})
