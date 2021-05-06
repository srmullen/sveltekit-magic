import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, SESSION_LENGTH_MS, TOKEN_NAME } from '$lib/config';

export function createTokenCookie(data): string {
  const token = jwt.sign({
    ...data,
    exp: Math.floor(Date.now() + SESSION_LENGTH_MS)
  }, JWT_SECRET);

  return serialize(TOKEN_NAME, token, {
    maxAge: SESSION_LENGTH_MS,
    expires: new Date(Date.now() + SESSION_LENGTH_MS),
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production',
    path: '/',
    sameSite: 'lax'
  });
}

export function removeTokenCookie(): string {
  return serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/'
  });
}