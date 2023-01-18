import type { CoioteLwM2MObject, LwM2MObject } from './convert'

export const convertValueUsingSchema = (
	schema: Record<string, any>,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	switch (schema.title) {
		case 'Temperature':
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
		case 'Humidity':
			return [
				{
					'5518': 2022,
					'5601': 31.064,
					'5602': 31.064,
					'5603': 0,
					'5604': 100,
					'5700': 28.927,
					'5701': '%',
				},
			]
		default:
			return null
	}
}
