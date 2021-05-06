import type { Request, Response } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { magic } from './_magic';
import { removeTokenCookie } from './_utils';
import { JWT_SECRET } from '$lib/config';

export async function get(req: Request): Promise<Response> {
  try {
    if (!req.locals.token) {
      return {
        status: 401,
        body: {
          error: {
            message: 'Unauthorized'
          }
        }
      };
    }

    const user = jwt.verify(req.locals.token, JWT_SECRET);

    const cookie = removeTokenCookie();

    console.log({ user, cookie });

    try {
      await magic.users.logoutByIssuer(user.issuer);
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