import _ from 'lodash'

/**
 * Strips HTML tags and entities from the given `str`
 * If `str` is `undefined` or `null` an empty string will be returned.
 *
 * @param {String} [str]
 * @return {String}
 */
export function cleanHtmlContent (str) {
	if (str == null) {
		return ''
	}

	return _.unescape(str)
	.replace(/<br\s*\/?>/g, '\n')
	.replace(/<\/\s*p\s*>/g, '\n')
	.replace(/&nbsp;/g, ' ')
	.replace(/(<[^>]*>)|(&#x200b;)/g, '')
	.replace(/\r?\n/g, '\n')
	.trim()
}
