import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { convertResource, convertValue } from './convertResource.js'
import type { CoioteLwM2MObjectPropertyValue } from 'src/types.js'
import type { ObjectSchema } from './convertObjectUsingSchema.js'

void describe('convertResource', () => {
	for (const [schema, value, expected] of [
		[
			{
				type: 'object',
				properties: {
					'1': {
						type: 'integer',
						minimum: 0,
						maximum: 1,
						title: 'Mute Send',
					},
				},
			},
			'false',
			0,
		],
		[
			{
				type: 'object',
				properties: {
					'1': {
						type: 'integer',
						minimum: 0,
						maximum: 1,
						title: 'Notification Storing When Disabled or Offline',
					},
				},
			},
			'false',
			0,
		],
		[
			{
				type: 'object',
				properties: {
					'1': {
						type: 'integer',
						unixTimestamp: true,
						title: 'Last Bootstrapped',
					},
				},
			},
			{ noValue: true },
			null,
		],
		[
			{
				type: 'object',
				properties: {
					'1': {
						type: 'integer',
						title: 'Default Maximum Period',
					},
				},
			},
			0,
			0,
		],
	] as [ObjectSchema, CoioteLwM2MObjectPropertyValue, unknown][])
		void it(`should convert prop from object (LwM2MServer). Value: '${value}' Expected: '${expected}'`, () =>
			assert.deepEqual(convertResource(schema, '1', value), expected))
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
