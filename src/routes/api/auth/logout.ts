import type { Request, Response } from '@sveltejs/kit';
// import jwt from 'jsonwebtoken';
// import { ENCRYPTION_SECRET } from '$lib/config';
import { magic } from './_magic';
import { removeSessionCookie, decrypt } from './_utils';
import { SESSION_NAME } from '$lib/config';

export async function get(req: Request): Promise<Response> {
  try {
    if (!req.locals[SESSION_NAME]) {
      return {
        status: 401,
        body: {
          error: {
            message: 'Unauthorized'
          }
        }
      };
    }

    // const user = jwt.verify(req.locals[SESSION_NAME], ENCRYPTION_SECRET);
    const user = await decrypt<{ issuer: string }>(req.locals[SESSION_NAME]);

    const cookie = removeSessionCookie();

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