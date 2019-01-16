import { promisify } from 'util'
import { createHash, randomBytes } from 'crypto'
const random = promisify(randomBytes)

export function cloneClassInstance (object) {
	return Object.assign(Object.create(object), object)
}

export async function randomMD5 (nBytes = 18) {
	const hash = createHash('md5')
	hash.update(await random(nBytes))
	return hash.digest('hex')
}
