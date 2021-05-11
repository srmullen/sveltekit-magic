import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import { SESSION_NAME } from '$lib/config';
import { getSession } from './routes/api/auth/_utils';

export const handle: Handle = async ({ request, render }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	// request.locals[SESSION_NAME] = cookies[SESSION_NAME];

	const user = await getSession(cookies[SESSION_NAME]);
	request.locals.user = user;

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await render(request);

	return response;
};
