import type { CoioteLwM2MObject } from './convert'
import { convertObjectUsingSchema } from './convertObjectUsingSchema'
import LwM2MSchema from './node_modules/@nordicsemiconductor/lwm2m-types/LwM2MDocument.schema.json'

describe('convertObjectUsingSchema', () => {
	it('should convert value using json schema', () => {
		const temperatureValue: CoioteLwM2MObject = {
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
		}
		const expected = [
			{
				'5518': 2022, // FIXME 1665149633 -> solve issue with timestamp
				'5601': 23.51,
				'5602': 23.51,
				'5603': -40,
				'5604': 85,
				'5700': 24.57,
				'5701': 'Celsius degrees',
			},
		]
		expect(
			convertObjectUsingSchema(
				LwM2MSchema.properties['3303:1.1'],
				temperatureValue,
			),
		).toMatchObject(expected)
	})

	it('should convert value to object using json schema', () => {
		// Firmware Update
		const value: CoioteLwM2MObject = {
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
		}
		const expected = { '3': 0, '5': 1, '9': 2 }
		expect(
			convertObjectUsingSchema(LwM2MSchema.properties['5:1.1@1.1'], value),
		).toMatchObject(expected)
	})

	it('should convert value to array using json schema', () => {
		// ECID-Signal Measurement Information
		const value: CoioteLwM2MObject = {
			'0': {
				physCellId: '247',
				ECGI: '0',
				arfcnEUTRA: '6400',
				'rsrq-Result': '-96',
				'rsrp-Result ': '-12',
				'ue-RxTxTimeDiff': '0',
			},
			'1': {
				physCellId: '425',
				ECGI: '0',
				arfcnEUTRA: '300',
				'rsrq-Result': '-115',
				'rsrp-Result ': '-12',
				'ue-RxTxTimeDiff': '23',
			},
			'2': {
				physCellId: '195',
				ECGI: '0',
				arfcnEUTRA: '300',
				'rsrq-Result': '-119',
				'rsrp-Result ': '-16',
				'ue-RxTxTimeDiff': '23',
			},
		}
		const expected = [
			{ '0': 247, '1': 0, '2': 6400, '3': -12, '4': -96, '5': 0 },
			{ '0': 425, '1': 0, '2': 300, '3': -12, '4': -115, '5': 23 },
			{ '0': 195, '1': 0, '2': 300, '3': -16, '4': -119, '5': 23 },
		]
		expect(
			convertObjectUsingSchema(LwM2MSchema.properties['10256'], value),
		).toMatchObject(expected)
	})
})
