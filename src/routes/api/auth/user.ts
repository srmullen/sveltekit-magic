import type { Request, Response } from '@sveltejs/kit';
// import jwt from 'jsonwebtoken';
// import { ENCRYPTION_SECRET } from '$lib/config';
import { createSessionCookie, decrypt } from './_utils';
import { SESSION_NAME } from '$lib/config';

export async function get(req: Request): Promise<Response> {
  try {
    if (!req.locals[SESSION_NAME]) {
      return {
        status: 200,
        body: {
          user: null
        }
      };
    }

    // const user = jwt.verify(req.locals.token, ENCRYPTION_SECRET);
    const user = await decrypt(req.locals[SESSION_NAME]);

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