import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET /todos.json
export const get: RequestHandler<Locals> = async (request) => {
	// request.locals.user.publicAddress comes from magic and is set in the src/hooks.ts file.
	const response = await api(request, `todos/${request.locals.user.publicAddress}`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return { body: [] };
	}

	return response;
};

// POST /todos.json
export const post: RequestHandler<Locals, FormData> = async (request) => {
	const response = await api(request, `todos/${request.locals.user.publicAddress}`, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		text: request.body.get('text')
	});

	return response;
};
