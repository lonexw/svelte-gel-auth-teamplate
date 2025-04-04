import type {
  BuiltinProviderNames,
  TokenData,
  Client,
} from "$lib/gel/auth-sveltekit/server";
// import { client } from "$lib/gel/client";
import { Octokit } from "@octokit/core";

export async function newAccount({
  client,
  tokenData,
  provider,
}: {
  client: Client;
  tokenData: TokenData;
  provider?: BuiltinProviderNames;
}) {
  let email: string | null = null;
  // 处理 github 的 oauth 方法, 如果使用其它供应商记得处理单独的逻辑
  if (tokenData.provider_token && provider === "builtin::oauth_github") {
    const { data } = await new Octokit({
      auth: tokenData.provider_token,
    }).request("GET /user/emails");

    data.forEach((item: { primary: boolean; email: string }) => {
      if (item.primary) {
        email = item.email;
      }
    });
  } else {
    const emailFactor: any = await client.querySingle(
      `with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id)
       select ext::auth::EmailFactor { email } filter .identity = identity`,
      {
        identity_id: tokenData.identity_id,
      }
    );
    email = emailFactor.email;
  }

  // 检查 email 是否存在
  const emailExists = await client.queryRequiredSingle<boolean>(
    `select exists (select User filter .email = <str>$email)`,
    {
      email,
    }
  );
  if (emailExists) {
    // 将 identity 关联到已存在的用户
    await client.query(
      `update User filter .email = <str>$email
      set {
        identities += (select ext::auth::Identity filter .id = <uuid>$identity_id),
      }`,
      {
        identity_id: tokenData.identity_id,
        email,
      }
    );
  } else {
    // 新增 User 对象
    await client.query(
      ` with identity := (select ext::auth::Identity filter .id = <uuid>$identity_id),
        insert User {
          identities := identity,
          name := <str>$email,
          email := <str>$email,
          userRole := 'user',
        } unless conflict on .identities`,
      {
        identity_id: tokenData.identity_id,
        email,
      }
    );
  }
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

export async function getUserProfile(client: Client): Promise<any> {
  try {
    const users = await client.query(`
      select User { id, name, userRole, email, emailFactor := 
        assert_single((select ext::auth::EmailFactor { email, verified_at }
          filter .email = User.email)), 
      }
      filter (global ext::auth::ClientTokenIdentity) in .identities
    `);
    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.log("global current_user does not exist", error);
    return null;
  }
}
