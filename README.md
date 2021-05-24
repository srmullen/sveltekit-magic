# sveltekit-magic

This is a demo application for using [Magic](https://magic.link/) auth with SvelteKit. Magic provides secure, passwordless authentication for your application.

**See it in action here: https://sveltekit-magic.netlify.app/**

## How it works

When a user wants to log into the app they will click on the LOGIN link in the header. This will bring them to a page that displays the login form. There is separate signup and login pages. They are all the same. There is also no password field to fill out on this page. That greatly reduces friction when signing up/logging into the application because the user doesn't need to create or remember their passwords. When the user submits their email a link will be sent to them. Clicking on the link will log them into the application and the signup page (assuming the user didn't close it) will naviate to the todos page, which is the protected page of the application.

While that is happening, the Magic SDK generates a [DID token](https://w3c-ccg.github.io/did-primer/) (Decentralized Identifier) that gets sent to a SvelteKit endpoint for validation. This `routes/api/auth/login` endpoint validates the token and gets some metadata about the user. This metadata is added to a cookie that gets sent to the user so we can reconize the user on subsequent requests.

On the frontend we check to see if a user is logged-in in the top-level `__layout.svelte` component's, `load` function. This function calls the `routes/api/auth/user` endpoint which returns the user info and refreshes the cookie if the user is logged in, otherwise it doesn't return anything. That information gets put into an authentication store, which can be checked to see if the client is logged in or not. The `todos/__layout.svelte` component's load function (this `load` function runs after the top-level `load` function) checks that store for a user, and renders the page if it exists. If the user doesn't exist a redirect response is returned and the client is sent to the login page. Because this happens in a `load` function this can happen either client-side or server-side.

The client can now create todos. Every request made for a SvelteKit app runs through the `handle` function defined in `hooks.ts`. In this function the session cookie is read to get the user metadata which set on the `request.locals` object. This metadata contains a `publicAddress` which here is used like an id for identifying the user.

When the user logs out, by clicking on the LOGOUT link, a request to the `routes/api/auth/logout` endpoint is made, which invalidates the session cookie and logs out the user on Magic (by default they stay logged in on Magic for seven days).

## Run it yourself

1. Sign up for a [Magic account](https://magic.link/).
2. Rename `.env.example` to `.env`
3. Populate the variables in the `.env` file.
4. Start the development server `npm run dev`.
