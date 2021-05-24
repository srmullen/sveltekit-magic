import type { Request, Response } from '@sveltejs/kit';
import { createSessionCookie } from './_utils';

export async function get(req: Request): Promise<Response> {
	try {
		if (!req.locals.user) {
			return {
				status: 200,
				body: {
					user: null
				}
			};
		}

		const user = req.locals.user;

		// Refresh session
		const cookie = await createSessionCookie(user);

		return {
			status: 200,
			headers: {
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
