import type { AssetTrackerLwM2MShadowDocument } from '../types'
import { ConfigurationURN } from './convertConfiguration'
import { validateConfig } from './validateConfig'

/**
 * Validate LwM2M object definitions that are not defined in the LwM2M object registry:
 *
 * Right now these are known:
 * - asset_tracker_v2 configuration
 */
export const validateCustomObjects = (
	input: AssetTrackerLwM2MShadowDocument,
): AssetTrackerLwM2MShadowDocument => {
	const result = { ...input }
	const config = result[ConfigurationURN]
	if (config !== undefined) {
		if (!validateConfig(config)) delete result[ConfigurationURN]
	}
	return result
}
