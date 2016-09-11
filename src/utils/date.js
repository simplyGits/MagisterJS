import moment from 'moment'

/**
 * Tries to parse `val` to a date, if it fails this function will return
 * `undefined` instead of an invalid date.
 *
 * @method parseDate
 * @param {any} val
 * @return {Date|undefined}
 */
export function parseDate (val) {
	const n = Date.parse(val)
	if (!isNaN(n)) {
		return new Date(n)
	}
}

/**
 * @method date
 * @param {Date} date
 * @return {Date}
 */
export function date (date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * @method urlDateConvert
 * @param {Date} date
 * @return {String}
 */
export function urlDateConvert (date) {
	return moment(date).format('Y-MM-DD')
}
