import type { CoioteLwM2MObject, LwM2MObject } from '../types'
import { convertToArray } from './convertToArray'
import { convertToObject } from './convertToObject'

export type Schema = {
	type: 'array' | 'object'
	title: string
}

export const convertObjectUsingSchema = (
	objectSchema: Schema,
	value: CoioteLwM2MObject,
): LwM2MObject | null => {
	if (!isArray(objectSchema)) return convertToObject(objectSchema, value)
	return convertToArray(objectSchema, value)
}

const isArray = (objectSchema: Schema): boolean => objectSchema.type === 'array'
