/**
 * Returns the value as a string, or the value itself if it's `undefined` or
 * `null`.
 * @param {any} val
 * @returns {string|undefined|null}
 */
export function toString(val) {
	if (val == null) {
		return val
	} else {
		return val.toString()
	}
}
