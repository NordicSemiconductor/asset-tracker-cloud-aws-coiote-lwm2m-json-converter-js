import { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import { convertToArray } from './convertToArray'

describe('convertToArray()', () => {
	it.each([
		[
			{
				'0': {
					'Application Type': '',
					'Fractional Timestamp': {
						noValue: true,
					},
					'Max Measured Value': '23.51',
					'Max Range Value': '85.0',
					'Measurement Quality Indicator': {
						noValue: true,
					},
					'Measurement Quality Level': {
						noValue: true,
					},
					'Min Measured Value': '23.51',
					'Min Range Value': '-40.0',
					'Reset Min and Max Measured Values': {
						noValue: true,
					},
					'Sensor Units': 'Celsius degrees',
					'Sensor Value': '24.57',
					Timestamp: '2022-10-07T13:33:22Z',
				},
			},
			'3303:1.1',
			[
				{
					'5518': 1665149602,
					'5601': 23.51,
					'5602': 23.51,
					'5603': -40,
					'5604': 85,
					'5700': 24.57,
					'5701': 'Celsius degrees',
				},
			],
		],
		[
			{
				'0': {
					physCellId: '247',
					ECGI: '0',
					arfcnEUTRA: '6400',
					'rsrq-Result': '-96',
					'rsrp-Result': '-12',
					'ue-RxTxTimeDiff': '0',
				},
				'1': {
					physCellId: '425',
					ECGI: '0',
					arfcnEUTRA: '300',
					'rsrq-Result': '-115',
					'rsrp-Result': '-12',
					'ue-RxTxTimeDiff': '23',
				},
				'2': {
					physCellId: '195',
					ECGI: '0',
					arfcnEUTRA: '300',
					'rsrq-Result': '-119',
					'rsrp-Result': '-16',
					'ue-RxTxTimeDiff': '23',
				},
			},
			'10256',
			[
				{ '0': 247, '1': 0, '2': 6400, '3': -12, '4': -96, '5': 0 },
				{ '0': 425, '1': 0, '2': 300, '3': -12, '4': -115, '5': 23 },
				{ '0': 195, '1': 0, '2': 300, '3': -16, '4': -119, '5': 23 },
			],
		],
	])(
		'should convert object definition %j for object %s using json schema to %j',
		(objectDefinition, urn, expected) =>
			expect(
				convertToArray(
					LwM2MDocumentSchema.properties[urn],
					objectDefinition as any,
				),
			).toMatchObject(expected),
	)
})
