import type { Request, Response } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$lib/config';
import { createTokenCookie } from './_utils';

export async function get(req: Request): Promise<Response> {
  try {
    if (!req.locals.token) {
      return {
        status: 200,
        body: {
          user: null
        }
      };
    }

    const user = jwt.verify(req.locals.token, JWT_SECRET);

    // Refresh JWT
    const tokenCookie = createTokenCookie(user);

    return {
      status: 200,
      headers: {
        'set-cookie': tokenCookie
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