import { describe, it } from 'node:test'
import assert from 'node:assert'
import { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import { convertObjectUsingSchema } from './convertObjectUsingSchema.js'
import type { CoioteLwM2MObject } from 'src/types.js'

void describe('convertObjectUsingSchema()', () => {
	for (const [objectDefinition, urn, expected] of [
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
					'5750': '',
				},
			],
		],
		[
			{
				'0': {
					'Firmware Update Protocol Support': {},
					'Firmware Update Delivery Method': '2',
					Package: {
						noValue: true,
					},
					'Package URI': '',
					PkgName: '',
					PkgVersion: '',
					State: '0',
					Update: {
						noValue: true,
					},
					'Update Result': '1',
				},
			},
			'5:1.1@1.1',
			{ '1': '', '3': 0, '5': 1, '6': '', '7': '', '9': 2 },
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
	] as [CoioteLwM2MObject, string, unknown][]) {
		void it(`should convert object definition of object '${urn}' using json schema`, () => {
			assert.deepStrictEqual(
				convertObjectUsingSchema(
					LwM2MDocumentSchema.properties[urn],
					objectDefinition,
				),
				expected,
			)
		})
	}
})
