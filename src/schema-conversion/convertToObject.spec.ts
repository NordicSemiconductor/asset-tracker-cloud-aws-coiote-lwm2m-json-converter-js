import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { LwM2MDocumentSchema } from '@nordicsemiconductor/lwm2m-types'
import { convertToObject } from './convertToObject.js'
import type { CoioteLwM2MObject } from 'src/types.js'

void describe('convertToObject()', () => {
	for (const [objectDefinition, urn, expected] of [
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
			'5:1.2@1.1',
			{
				'1': '',
				'3': 0,
				'5': 1,
				'6': '',
				'7': '',
				'9': 2,
			},
		],
		// Array values
		[
			{
				'0': {
					'Radio Signal Strength': '-96',
					'Cell ID': '21627653',
					SMNC: '1',
					SMCC: '242',
					LAC: '30401',
					APN: {
						'0': 'ibasis.iot',
					},
					'Available Network Bearer': {
						'0': '6',
						'1': '7',
					},
					'IP Addresses': {
						'0': '10.160.225.39',
					},
					'Router IP Addresses': {},
					'Link Quality': '0',
					'Network Bearer': '6',
					SignalSNR: '0',
				},
			},
			'4:1.3@1.1',
			{
				'0': 6,
				'1': [6, 7],
				'10': 242,
				'11': 0,
				'12': 30401,
				'2': -96,
				'3': 0,
				'4': ['10.160.225.39'],
				'7': ['ibasis.iot'],
				'8': 21627653,
				'9': 1,
			},
		],
	] as [CoioteLwM2MObject, string, unknown][]) {
		void it(`should convert ${objectDefinition} of ${urn} to ${expected}`, () => {
			assert.deepEqual(
				convertToObject(LwM2MDocumentSchema.properties[urn], objectDefinition),
				expected,
			)
		})
	}
})
