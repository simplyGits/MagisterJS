import { promisify } from 'util'
import { randomBytes } from 'crypto'
const random = promisify(randomBytes)

export function cloneClassInstance (object) {
	return Object.assign(Object.create(object), object)
}

export async function randomHex (nBytes = 16) {
	const bytes = await random(nBytes)
	return bytes.toString('hex')
}
