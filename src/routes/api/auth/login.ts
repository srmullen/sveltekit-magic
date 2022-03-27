import type { EndpointOutput, RequestEvent } from '@sveltejs/kit';
import { magic } from './_magic';
import { createSessionCookie } from './_utils';

export async function post(evt: RequestEvent): Promise<EndpointOutput> {
	try {
		const didToken = magic.utils.parseAuthorizationHeader(evt.request.headers.get('authorization'));
		await magic.token.validate(didToken);
		const metadata = await magic.users.getMetadataByToken(didToken);
		const cookie = await createSessionCookie(metadata);

		return {
			status: 200,
			headers: {
				'set-cookie': cookie
			},
			//@ts-ignore
			body: {
				user: metadata
			}
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: {
				error: {
					message: 'Internal Server Error'
				}
			}
		};
	}
}
