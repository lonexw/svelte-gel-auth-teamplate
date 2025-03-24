import { options } from "$lib/auth";
import { client } from "$lib/server/gel";
import serverAuth, { type AuthRouteHandlers } from "@gel/auth-sveltekit/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

// call serverAuth with the client and options
const { createServerRequestAuth, createAuthRouteHook } = serverAuth(
  client,
  options
)

// attach the server client to event.locals
const createServerAuthClient: Handle = ({ event, resolve }) => {
    event.locals.auth = createServerRequestAuth(event)
    return resolve(event)
}

// define the auth route handlers
const authRouteHandlers: AuthRouteHandlers = {
    async onOAuthCallback({ error, tokenData, provider, isSignUp }) {
        redirect(303, "/")
    },
    onBuiltinUICallback({ error, tokenData, provider, isSignUp }) { 
        console.log(tokenData, isSignUp)
        redirect(303, "/")
    },
    onSignout() {
        console.log("signout")
        redirect(301, "/")
    }
}

// invoke it inside sequence
export const handle = sequence(
    createServerAuthClient,
    createAuthRouteHook(authRouteHandlers)
)