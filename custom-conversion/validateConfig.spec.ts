import { validateConfig } from './validateConfig'

describe('validateConfig()', () => {
	it('mark invalid config', () =>
		expect(
			validateConfig({
				'42': '666',
			} as any),
		).toEqual(false))
})
