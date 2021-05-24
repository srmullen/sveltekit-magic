import { serialize } from 'cookie';
import { ENCRYPTION_SECRET, SESSION_LENGTH_MS, SESSION_NAME } from '$lib/config';
import Iron from '@hapi/iron';

async function encrypt(data): Promise<string> {
	return data && Iron.seal(data, ENCRYPTION_SECRET, Iron.defaults);
}

async function decrypt<T>(data: string): Promise<T> {
	return data && Iron.unseal(data, ENCRYPTION_SECRET, Iron.defaults);
}

export async function createSessionCookie(data: any): Promise<string> {
	const session = await encrypt(data);

	return serialize(SESSION_NAME, session, {
		maxAge: SESSION_LENGTH_MS / 1000, // maxAge is in seconds. Divide by 1000 to convert from milliseconds to seconds.
		expires: new Date(Date.now() + SESSION_LENGTH_MS),
		httpOnly: true,
		secure: process.env['NODE_ENV'] === 'production',
		path: '/',
		sameSite: 'lax'
	});
}

export async function getSession<T>(cookie: string): Promise<T> {
	return await decrypt(cookie);
}

export function removeSessionCookie(): string {
	return serialize(SESSION_NAME, '', {
		maxAge: -1,
		path: '/'
	});
}
