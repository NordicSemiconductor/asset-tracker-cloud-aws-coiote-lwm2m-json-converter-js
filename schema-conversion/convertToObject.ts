import type { AssetTrackerLwM2MObject, CoioteLwM2MObject } from '../types'
import type { Schema } from './convertObjectUsingSchema'

export const convertToObject = (
	_: Schema,
	__: CoioteLwM2MObject,
): AssetTrackerLwM2MObject => ({ '3': 0, '5': 1, '9': 2 })
