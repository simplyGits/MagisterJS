import moment from 'moment'

/**
 * Tries to parse `val` to a date, if it fails this function will return
 * `undefined` instead of an invalid date.
 *
 * @param {any} val
 * @returns {Date|undefined}
 */
export function parseDate (val) {
	const n = Date.parse(val)
	if (!isNaN(n)) {
		return new Date(n)
	}
}

/**
 * @param {Date} date
 * @returns {Date}
 */
export function date (date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function urlDateConvert (date) {
	return moment(date).format('Y-MM-DD')
}
