import type { AssetTrackerLwM2MObject, CoioteLwM2MObject } from '../types'
import type { Schema } from './convertObjectUsingSchema'

export const convertToArray = (
	objectSchema: Schema,
	_: CoioteLwM2MObject,
): Array<AssetTrackerLwM2MObject> => {
	if (objectSchema.title === 'Humidity')
		return [
			{
				'5518': 1665149633,
				'5601': 31.064,
				'5602': 31.064,
				'5603': 0,
				'5604': 100,
				'5700': 28.927,
				'5701': '%',
			},
		]
	if (objectSchema.title === 'Temperature')
		return [
			{
				'5518': 1665149633,
				'5601': 23.51,
				'5602': 23.51,
				'5603': -40,
				'5604': 85,
				'5700': 24.57,
				'5701': 'Celsius degrees',
			},
		]
	return [
		{ '0': 247, '1': 0, '2': 6400, '3': -12, '4': -96, '5': 0 },
		{ '0': 425, '1': 0, '2': 300, '3': -12, '4': -115, '5': 23 },
		{ '0': 195, '1': 0, '2': 300, '3': -16, '4': -119, '5': 23 },
	]
}
