import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { convertResource, convertValue } from './convertResource.js'
import type { CoioteLwM2MObjectPropertyValue } from 'src/types.js'
import {
	LwM2MDocumentSchema,
	LwM2MServer_1_urn,
} from '@nordicsemiconductor/lwm2m-types'

void describe('convertResource', () => {
	for (const [propId, value, expected] of [
		['23', 'false', 0],
		['6', 'false', 0],
		['12', { noValue: true }, null],
		['3', 0, 0],
	] as [string, CoioteLwM2MObjectPropertyValue, unknown][])
		void it(`should convert prop '${propId}' from object (LwM2MServer). Value: '${value}' Expected: '${expected}'`, () =>
			assert.deepEqual(
				convertResource(
					LwM2MDocumentSchema.properties[LwM2MServer_1_urn].items,
					propId,
					value,
				),
				expected,
			))
})

void describe('convertValue', () => {
	for (const [value, type, expected] of [
		['true', 'boolean', true],
		['false', 'boolean', false],
		['false', 'integer', 0], // special integer/boolean case
		['true', 'integer', 1], // special integer/boolean case
		['hello world', 'string', 'hello world'],
		['10', 'number', 10],
		['100', 'integer', 100],
		['1970-01-01T00:00:00Z', 'timestamp', 0],
		['', '', null],
	] as [
		string,
		'integer' | 'number' | 'boolean' | 'string' | 'timestamp',
		unknown,
	][])
		void it(`should convert value '${value}' which is type '${type}' to '${expected}'`, () =>
			assert.equal(convertValue(value, type), expected))
})
