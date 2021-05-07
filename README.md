sveltekit-magic
===============

This is a demo application for using Magic auth with SvelteKit.

Magic handles authentication, but how do you do authorization? You need to have a way to recognize the user. So store the user in a token.

Magic uses DID tokens. Decentralized identifier. https://w3c-ccg.github.io/did-primer/

JWTs do not seem neccessary for a SvelteKit application.

Storing JWTs in local/session storage can be vulnerable to XSS attacks. Javascript can read the storage to get the tokens. With the correct headers (HttpOnly) the token will be inaccessible if it is a cookie.

Cookies are vulnerable to CSRF attacks. Malicious site causes a user's browser to perform an unwanted action on a trusted site where the user is already authenticated.

Make the todos a protected route.

## Steps

- Install the dependencies `npm install @magic-sdk/admin magic-sdk jsonwebtoken`
- Create the api routes `routes/api/login.ts` `routes/api/logout.ts` `routes/api/user.ts`
- Get Magic api keys and put them in the .env file. Make sure .env is in .gitignore.
- Create frontend login page and function.
- Create a Protected.svelte component and wrap around the todos page. The Protected component is a wrapper around section of the page that users need to be logged in to access. It will read from the user store and see if the user is loading, authenticated, or unauthenticated. If the user is not authorized, nothing will display.

Magic needs to run in the browser, so need to initialize it in onMount function.

- Write the login function.
- Create SESSION_LENGTH and JWT_SECRET env variables

- write the auth.init function. This function sets the state of the auth store and checks with the backend that there is a valid session.
- Implement the authenticate function. It sets a user in the store if there is an authenticated user. Start with a just a setTimeout, that sets nothing.
- Create the backend auth/user function.

The Protected.svelte component will be separate from the AuthContext component so that AuthContext can always be loaded at top level but not force whole page to wait for server response.

- Use the `handle` hook to parse the jwt token
- Create the token cookie in `api/auth/_utils.ts`

Server Side authentication
--------------------------

Can the user be authenticated on the server side? The `authenticate` function does not use the frontend magic-sdk (only the `login` function does), So it should be usable on the server. AuthContext is really being used as a context because the authentication status isn't being placed in a svelte context. So it's easy to use from a layout.

Use `load` functions context and redirect properties for passing the user to the protected pages and deciding if need to redirect.

On the main route layout we get the user that is logged in and add it to the load function context. In the Todos layout we can see if that user is in the context and redirect appropriately.

On HMR the user is being removed from the store, causing it to look like the user is logged out? This is annoying for dev, but is it a problem for prod?

TODO
----
- Navigate to the login page when the user tries to access todos while unauthorized.
