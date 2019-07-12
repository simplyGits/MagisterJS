import { URL } from 'url'

export function cloneClassInstance(object) {
	return Object.assign(Object.create(object), object)
}

export function extractQueryParameter(url, parameter) {
	const parsedUrl = new URL(url)

	return parsedUrl.searchParams.get(parameter)
}
