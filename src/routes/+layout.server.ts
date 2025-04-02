import { checkUIEnabled, getEmailInfo } from "$db/queries/auth";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = locals.auth.session;
  const isSignedIn = await session.isSignedIn();
  const builtinUIEnabled = await checkUIEnabled(session.client);
  const emailInfo = await getEmailInfo(session.client);

  return {
    builtinUIEnabled,
    isSignedIn,
    emailInfo,
  };
};
