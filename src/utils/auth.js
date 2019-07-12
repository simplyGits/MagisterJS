import { URL } from 'url'
import { promisify } from 'util'
import { randomBytes } from 'crypto'

const random = promisify(randomBytes)

/**
 * Generates a random hexadecimal, used for authentication.
 * @param {int} nBytes Amount of bytes to use.
 * @returns {Promise<string>} A random hexadecimal.
 */
async function randomHex(nBytes = 16) {
	const bytes = await random(nBytes)
	return bytes.toString('hex')
}

/**
 * Generates a corresponding authentication url given the school url.
 * @param {string} schoolUrl The school url.
 * @returns {Promise<string>} The authentication url.
 */
export async function getAuthenticationUrl(schoolUrl) {
	const filteredName = schoolUrl.replace('https://', '')
	const authUrl = new URL('https://accounts.magister.net/connect/authorize')
	const authData = {
		client_id: `M6-${filteredName}`,
		redirect_uri: `https://${filteredName}/oidc/redirect_callback.html`,
		response_type: 'id_token token',
		acr_values: `tenant:${filteredName}`,
		scope: 'openid profile magister.ecs.legacy magister.mdv.broker.read magister.dnn.roles.read',
		state: await randomHex(),
		nonce: await randomHex(),
	}

	const keys = Object.keys(authData)
	for (const key of keys) {
		authUrl.searchParams.set(key, authData[key])
	}

	return authUrl.toString()
}
