import type {
  BuiltinProviderNames,
  TokenData,
  Client,
} from "@gel/auth-sveltekit/server";
// import { Octokit } from "@octokit/core";

export async function newAccount({
  client,
  tokenData,
  provider,
}: {
  client: Client;
  tokenData: TokenData;
  provider?: BuiltinProviderNames;
}) {
  let username: string | null = null;

  //   if (tokenData.provider_token && provider === "builtin::oauth_github") {
  //     const { data } = await new Octokit({
  //       auth: tokenData.provider_token,
  //     }).request("get /user");

  //     username = data.login;
  //   }

  await client.query(
    `
    with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
    insert User {
      identity := identity,
      name := <optional str>$username ?? (
        select ext::auth::EmailFactor filter .identity = identity
      ).email,
      userRole := 'admin',
    } unless conflict on .identity`,
    {
      identity_id: tokenData.identity_id,
      username: username,
    }
  );
}
