import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions = {
  default: async ({ locals }) => {
    console.log("signout... @action");
    await locals.auth.signout();
    redirect(303, "/");
  },
} satisfies Actions;