import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateConfig } from './validateConfig.js'

void describe('validateConfig()', () => {
	void it('mark invalid config', () => {
		assert.strictEqual(
			validateConfig({
				'42': '666',
			} as any),
			false,
		)
	})
})
