import { checkUIEnabled, getUserProfile } from "$db/queries/auth";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = locals.auth.session;
  const isSignedIn = await session.isSignedIn();
  const builtinUIEnabled = await checkUIEnabled(session.client);
  const userProfile = isSignedIn ? await getUserProfile(session.client) : null;

  return {
    builtinUIEnabled,
    isSignedIn,
    userProfile,
  };
};
