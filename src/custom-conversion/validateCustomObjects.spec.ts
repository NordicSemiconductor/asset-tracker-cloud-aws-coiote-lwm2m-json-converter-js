import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateCustomObjects } from './validateCustomObjects.js'

void describe('validateCustomObjects()', () =>
	void describe('should remove invalid custom objects', () =>
		void it('remove invalid config', () => {
			const input = {
				'50009@1.2': {
					'42': '666',
				},
			}
			const output = validateCustomObjects(input as any)
			assert.equal(output['50009@1.2'], undefined)
		})))
