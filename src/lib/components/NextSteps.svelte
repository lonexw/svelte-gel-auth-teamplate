<!-- 项目说明文件, 不需要可以删除 -->
<script lang="ts">
  import clientAuth from "$lib/gel/clientAuth";
</script>
 
<div class="tabs tabs-lift m-3">
  <label class="tab">
    <input type="radio" name="my_tabs" checked={true} />
    🚀 使用 Gel Auth BuiltinUI
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <blockquote>
      按照项目 <a
        href="https://github.com/lonexw/svelte-gel-auth-teamplate/blob/main/README.md"
        class="btn-link">📖 README</a
      > 的指导, 正常连接 Gel 数据库并初始化 Auth 配置后, 就可以直接使用 Gel Auth
      的内置 UI 组件.
    </blockquote>
    <p>
      在 <strong>src/hooks.server.ts</strong> 文件中我们做两件事情, 首先将 auth 信息加入到所有请求中:
    </p>
    <pre class="bg-slate-50 p-2 dark:bg-stone-900"><code
      >{`// src/hooks.server.ts
// Create the server auth client in a handle hook.
const { createServerRequestAuth, createAuthRouteHook } = serverAuth(
  client,
  options
);

// attach the server client to event.locals
const createServerAuthClient: Handle = ({ event, resolve }) => {
  event.locals.auth = createServerRequestAuth(event);
  return resolve(event);
};`}</code
    ></pre>

    <p>
      并配置 auth 相关的 callback 路由,
      可以根据实际需求实现业务逻辑(在注册成功后将用户和 identity_id 进行绑定):
    </p>
    <pre class="bg-slate-50 p-2 dark:bg-stone-900"><code
      >{`// src/hooks.server.ts
const authRouteHandlers: AuthRouteHandlers = {
  ...
  async onEmailVerify({ error, tokenData, verificationToken }) {
    if (error) {
      const params = new URLSearchParams({
        email_verification_error: "Email verification failed",
      });

      if (verificationToken) {
        params.set("verification_token", verificationToken);
      }

      redirect(303, \`/signup?$\{params.toString()}\`);
    }
    // dbschema/queries/auth.ts
    await newAccount({ client, tokenData });
    redirect(303, "/");
  },
  onSignout() {
    console.log("signout route callback");
    redirect(301, "/");
  },
};`}</code
    ></pre>
    <p>
      现在我们就可以 <strong>src/lib/clientAuth.ts</strong> 提供的方法跳转登陆入口:
    </p>
    <p>
      <a
        href={clientAuth.getBuiltinUIUrl()}
        class="btn btn-link"
        data-sveltekit-reload>登入 clientAuth.getBuiltinUIUrl()</a
      >
      |
      <a
        href={clientAuth.getBuiltinUISignUpUrl()}
        class="btn btn-link"
        data-sveltekit-reload>注册 clientAuth.getBuiltinUISignUpUrl()</a
      >
      |
      <a
        href={clientAuth.getSignoutUrl()}
        class="btn btn-link"
        data-sveltekit-reload>登出 clientAuth.getSignoutUrl()</a
      >
    </p>
  </div>

  <label class="tab">
    <input type="radio" name="my_tabs" />
    🛠️ 定制 Auth UI
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    可以直接查询数据库来确认内置 UI 是否已经启用:
    <pre><code>
  # *.server.ts
  const session = locals.auth.session
  const builtinUIEnabled = await session.client.queryRequiredSingle<boolean
          >(`select exists ext::auth::UIConfig`)
      </boolean></code
      ></pre>
    <p>在 <strong>src/routes/identity</strong> 目录中定义需要的路由:</p>
    <ul class="list-disc pl-4">
      <li>
        <a href="/identity/signin" class="btn-link" data-sveltekit-reload
          >登入 /identity/signin</a
        >
      </li>
      <li>
        <a href="/identity/signup" class="btn-link" data-sveltekit-reload
          >注册 /identity/signup</a
        >
      </li>
      <li>
        <a href="/identity/forgot-password" class="btn-link" data-sveltekit-reload
          >忘记密码 /identity/forgot-password</a
        >
      </li>
      <li>
        <a href="/identity/reset-password" class="btn-link" data-sveltekit-reload
          >重置密码 /identity/reset-password</a
        >
      </li>
      <li>
        <form action="/identity/signout" method="post">
          <button class="btn btn-outline" type="submit">
            登出 POST /identity/signout
          </button>
        </form>
      </li>
    </ul>
    <p>
      具体的代码实现可以参照这些文件内的实现, <a
        href="https://zaizhao.github.io/core/gel/auth.html"
        class="link">帮助文档 📄</a
      >
    </p>

    <div class="divider"></div>
    <h5>高级功能: 实现手机号码验证或扫码验证</h5>
    <p><small>[文档待整理]</small></p>
  </div>

  <label class="tab">
    <input type="radio" name="my_tabs" />
    🎉 下一步
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p>
      在示例数据库定义 <strong>dbschema/default.gel</strong> 中, 定义一个示例资源
      Item:
    </p>
    <pre class="bg-slate-50 p-2 dark:bg-stone-900"><code
        >{`type Item {
  required name: str;
  required created_by: User {
    default := global current_user;
  }
  ...

  # 对象级的访问控制 https://docs.geldata.com/reference/datamodel/access_policies
  access policy admin_has_full_access
    allow all
    using (global current_user.userRole ?= Role.admin);
  access policy creator_has_full_access
    allow all
    using (.created_by ?= global current_user);
  access policy others_read_only
    allow select, insert;
}`}</code
      ></pre>
    <p>
      为了方便代码管理, 我们将查询数据库的请求封装在 <strong
        >dbschema/queries</strong
      > 目录:
    </p>
    <pre class="bg-slate-50 p-2 dark:bg-stone-900"><code
        >{`// src/dbschema/queries/item.ts
import e from "../edgeql-js";
import type { Client } from "gel";

export async function getItems(client: Client, params: any): Promise<any[]> {
  const items = await e
    .select(e.Item, () => ({
      id: true,
      name: true,
      created: true,
      updated: true,
      created_by: {
        name: true,
        email: true,
      },
    }))
    .run(client);
  return items;
}
...`}</code
      ></pre>
    <p>
      现在你就可以网页访问 <strong>/items</strong> 对资源进行增加和删除操作, 可以测试下不同用户角色的数据库级别的权限控制.
    </p>
    <p>下一步, 以这个模版为基础来开发你自己的应用啦 🎉</p>
  </div>
</div>

<style>
  .tab-content p {
    margin: 1rem 0;
  }
</style>
