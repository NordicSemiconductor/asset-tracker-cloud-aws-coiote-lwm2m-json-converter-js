// FIXME: use @nordicsemiconductor/lwm2m-types
import type { LwM2MDocument } from './convert'

/**
 * Returns the LwM2M URN used by nRF Asset Tracker for the resource name used by Coiote.
 */
export const resourceNameToUrn = (
	resourceName: string,
): keyof LwM2MDocument | null =>
	({
		Temperature: '3303:1.1',
		Humidity: '3304:1.1',
	}[resourceName] ?? null)
