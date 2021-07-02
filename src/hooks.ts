import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import { SESSION_NAME } from '$lib/config';
import { getSession } from './routes/api/auth/_utils';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	const user = await getSession(cookies[SESSION_NAME]);
	request.locals.user = user;

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	return response;
};
