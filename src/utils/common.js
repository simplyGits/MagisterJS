import { promisify } from 'util'
import { randomBytes } from 'crypto'
import { encode as encodeQuery } from 'querystring'
const random = promisify(randomBytes)

export function cloneClassInstance(object) {
	return Object.assign(Object.create(object), object)
}


export async function randomHex(nBytes = 16) {
	const bytes = await random(nBytes)
	return bytes.toString('hex')
}

export async function createAuthUrl(schoolUrl) {
	const filteredName = schoolUrl.replace('https://', '')
	const authUrl = 'https://accounts.magister.net/connect/authorize'
	const authData = {
		client_id: `M6-${filteredName}`,
		redirect_uri: `https://${filteredName}/oidc/redirect_callback.html`,
		response_type: 'id_token token',
		acr_values: `tenant:${filteredName}`,
		scope: 'openid profile magister.ecs.legacy magister.mdv.broker.read magister.dnn.roles.read',
		state: await randomHex(),
		nonce: await randomHex()
	}

	return `${authUrl}?${encodeQuery(authData)}`
}