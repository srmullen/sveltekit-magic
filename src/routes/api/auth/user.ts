import type { EndpointOutput, RequestEvent } from '@sveltejs/kit';
import { createSessionCookie } from './_utils';

export async function get(evt: RequestEvent): Promise<EndpointOutput> {
	try {
		if (!evt.locals['user']) {
			return {
				status: 200,
				body: {
					user: null
				}
			};
		}

		const user = evt.locals['user'];

		// Refresh session
		const cookie = await createSessionCookie(user);

		return {
			status: 200,
			headers: {
				'cache-control': 'no-store',
				'set-cookie': cookie
			},
			body: {
				user
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
