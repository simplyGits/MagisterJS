export function cloneClassInstance (object) {
	return Object.assign(Object.create(object), object)
}
