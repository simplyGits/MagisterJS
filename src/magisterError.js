export default class MagisterError extends Error {
	constructor(raw) {
		super(raw.Message || raw.message)
	}
}
