import { fail, redirect } from "@sveltejs/kit";
import { parseError } from "$lib/utils/error";
import type { Actions } from "./$types";

export const load = async ({ locals }) => ({
  providers: await locals.auth.getProvidersInfo(),
});

export const actions = {
  resendVerEmail: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      await locals.auth.emailPasswordResendVerificationEmail(formData);

      return {
        message: "Verification email sent!",
      };
    } catch (e) {
      return fail(400, {
        error: `Error signing up: ${parseError(e)}`,
      });
    }
  },
  signUp: async ({ locals, request }) => {
    const formData = await request.formData();
    const client = locals.auth.session.client;

    try {
      const { tokenData } = await locals.auth.emailPasswordSignUp(formData);

      if (!tokenData) {
        return {
          message:
            `Email verification required: ` +
            `Follow the link in the verification email to finish registration`,
        };
      }
    } catch (e) {
      return fail(400, {
        error: `Error Email verification: ${parseError(e)}`,
      });
    }

    redirect(303, "/");
  },
} satisfies Actions;