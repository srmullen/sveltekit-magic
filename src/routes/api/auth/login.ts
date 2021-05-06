import type { Request, Response } from '@sveltejs/kit';
import { magic } from './_magic';
import { createTokenCookie } from './_utils';

export async function post(req: Request): Promise<Response> {
  try {
    const didToken = magic.utils.parseAuthorizationHeader(req.headers['authorization']);
    await magic.token.validate(didToken);
    const metadata = await magic.users.getMetadataByToken(didToken);
    const token = createTokenCookie(metadata);

    return {
      status: 200,
      headers: {
        'set-cookie': token
      },
      body: {
        user: metadata
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