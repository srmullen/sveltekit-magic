import type { Request, Response } from '@sveltejs/kit';
import { magic } from './_magic';
import { removeSessionCookie } from './_utils';

export async function get(req: Request): Promise<Response> {
	try {
		if (!req.locals.user) {
			return {
				status: 401,
				body: {
					error: {
						message: 'Unauthorized'
					}
				}
			};
		}

		const cookie = removeSessionCookie();

		try {
			await magic.users.logoutByIssuer(req.locals.user.issuer);
		} catch (err) {
			console.log('Magic session already expired');
		}

		return {
			status: 200,
			headers: {
				'set-cookie': cookie
			},
			body: {}
		};
	} catch (err) {
		return {
			status: 401,
			body: {
				error: {
					message: 'Unauthorized'
				}
			}
		};
	}
}
