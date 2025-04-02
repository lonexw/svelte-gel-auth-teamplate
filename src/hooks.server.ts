import { options } from "$lib/gel/clientAuth";
import { client } from "$lib/gel/client";
import serverAuth, { type AuthRouteHandlers } from "$lib/gel/auth-sveltekit/server";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { newAccount } from "$db/queries/auth";

// Create the server auth client in a handle hook.
const { createServerRequestAuth, createAuthRouteHook } = serverAuth(
  client,
  options
);

// attach the server client to event.locals
const createServerAuthClient: Handle = ({ event, resolve }) => {
  event.locals.auth = createServerRequestAuth(event);
  return resolve(event);
};

// define the auth route handlers
const authRouteHandlers: AuthRouteHandlers = {
  async onOAuthCallback({ error, tokenData, provider, isSignUp }) {
    // TODO
    redirect(303, "/");
  },
  async onBuiltinUICallback({ error, tokenData, provider, isSignUp }) {
    console.log('test auth callback')
    if (error) {
      redirect(
        303,
        `/?error=${encodeURIComponent(
          `Sign in with built-in UI failed: ${error.message}`
        )}`
      );
    }

    if (!tokenData) {
      redirect(
        303,
        `/?info=${encodeURIComponent(
          `Your email address requires validation before you can sign in. ` +
            `Follow the link in the verification email to continue.`
        )}`
      );
    }

    if (isSignUp) {
      await newAccount({ client, tokenData, provider });
    }

    redirect(303, "/");
  },
  async onEmailVerify({ error, tokenData, verificationToken }) {
    if (error) {
      const params = new URLSearchParams({
        email_verification_error: `Email verification failed: ${error.message}`,
      });

      if (verificationToken) {
        params.set("verification_token", verificationToken);
      }

      redirect(303, `/signup?${params.toString()}`);
    }

    await newAccount({ client, tokenData });
    redirect(303, "/");
  },
  onSignout() {
    console.log("signout route callback");
    redirect(301, "/");
  },
};

// invoke it inside sequence
export const handle = sequence(
  createServerAuthClient,
  createAuthRouteHook(authRouteHandlers),
);
