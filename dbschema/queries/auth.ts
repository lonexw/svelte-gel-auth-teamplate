import type {
  BuiltinProviderNames,
  TokenData,
  Client,
} from "$lib/gel/auth-sveltekit/server";
// import { client } from "$lib/gel/client";
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
        email := (select ext::auth::EmailFactor filter .identity = identity).email
      insert User {
        identity := identity,
        name := <optional str>$username ?? email,
        email := email,
        userRole := 'user',
      } unless conflict on .identity`,
    {
      identity_id: tokenData.identity_id,
      username: username,
    }
  );
}

export async function checkUIEnabled(client: Client): Promise<boolean> {
  try {
    return await client.queryRequiredSingle<boolean>(
      `select exists ext::auth::UIConfig`
    );
  } catch (error) {
    console.log("object type or alias 'ext::auth::UIConfig' does not exist");
    return false;
  }
}

export async function getEmailInfo(client: Client): Promise<any> {
  try {
    return await client.querySingle(
      `
      select ext::auth::EmailFactor { id, email, created_at, verified_at } 
        filter .identity = global ext::auth::ClientTokenIdentity
      `
    );
  } catch (error) {
    console.log("object type or alias 'ext::auth::EmailFactor' does not exist");
    return null;
  }
}
