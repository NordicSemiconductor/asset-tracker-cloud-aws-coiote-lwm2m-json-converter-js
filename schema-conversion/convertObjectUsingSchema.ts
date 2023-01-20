import type { CoioteLwM2MObject, LwM2MObject } from '../types'
import { convertToArray } from './convertToArray'
import { convertToObject } from './convertToObject'

export type Schema = (ObjectSchema | ArraySchema) & {
	title: string
}

type ObjectProperties = Record<
	string,
	| {
			title: string
			type: 'number' | 'integer' | 'boolean' | 'string'
			unixTimestamp?: boolean
	  }
	| {
			title: string
			type: 'array'
			items: {
				type: 'number' | 'integer' | 'boolean' | 'string'
				unixTimestamp?: boolean
			}
	  }
>

export type ObjectSchema = {
	type: 'object'

	properties: ObjectProperties
}

export type ArraySchema = {
	type: 'array'
	items: {
		type: 'object'
		properties: ObjectProperties
	}
}

export const convertObjectUsingSchema = (
	objectSchema: Schema,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	if (!isArray(objectSchema))
		return convertToObject(objectSchema as ObjectSchema, value)
	return convertToArray(objectSchema as ArraySchema, value)
}

const isArray = (objectSchema: Schema): boolean => objectSchema.type === 'array'
