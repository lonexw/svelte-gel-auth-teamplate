<script lang="ts">
  import clientAuth from "$lib/auth";

  let { data } = $props();
</script>

<div class="tabs tabs-lift m-3">
  <label class="tab">
    <input type="radio" name="my_tabs" checked={true} />
    🚀 使用 Gel Auth BuiltinUI
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <blockquote>
      按照项目 <a
        href="https://github.com/lonexw/svelte-gel-auth-teamplate/README.md"
        class="btn-link">📖 README</a
      > 的指导, 正常连接 Gel 数据库并初始化 Auth 配置后, 就可以直接使用 Gel Auth
      的内置 UI 组件.
    </blockquote>
    <p>
      在 <strong>src/hooks.server.ts</strong> 文件中我们做两件事情, 首先将 auth 信息加入到所有请求中:
    </p>
    <p>
      <img
        class="h-50"
        src="https://phab-xyz-1255747930.cos.ap-beijing.myqcloud.com/snippets/code_step_1.png"
        alt="code-step-1"
      />
    </p>

    <p>并配置 auth 相关的 callback 路由, 可以根据实际需求实现业务逻辑(在注册成功后将用户和 identity_id 进行绑定):</p>
    <p>
      <img
        class="h-50"
        src="https://phab-xyz-1255747930.cos.ap-beijing.myqcloud.com/snippets/code_step_2.png"
        alt="code-step-2"
      />
    </p>
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
    <p>在 <strong>src/routes/auth</strong> 目录中定义需要的路由:</p>
    <ul class="list-disc pl-4">
      <li>
        <a href="/auth/signin" class="btn-link" data-sveltekit-reload
          >登入 /auth/signin</a
        >
      </li>
      <li>
        <a href="/auth/signup" class="btn-link" data-sveltekit-reload
          >注册 /auth/signup</a
        >
      </li>
      <li>
        <a href="/auth/forgot-password" class="btn-link" data-sveltekit-reload
          >忘记密码 /auth/forgot-password</a
        >
      </li>
      <li>
        <a href="/auth/reset-password" class="btn-link" data-sveltekit-reload
          >重置密码 /auth/reset-password</a
        >
      </li>
      <li>
        <form action="/auth/signout" method="post">
          <button
            class="btn btn-outline"
            type="submit"
          >
            登出 POST /auth/signout
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
    <p>我们先用一个资源示例来演示一下 Auth 和 Access Policy 如何使用:</p>
  </div>
</div>

<style>
  .tab-content p {
    margin: 1rem 0;
  }
</style>
