<script lang="ts">
  import "../app.css";
  import clientAuth from "$lib/gel/clientAuth";

  let { children, data } = $props();
  const appName = import.meta.env.VITE_GEL_AUTH_APP_NAME || "Svelte + Gel Auth Teamplate";
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="/">{appName}</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      {#if !data.isSignedIn}
        <li>
          <a
            href={clientAuth.getBuiltinUIUrl()}
            class="btn btn-dash btn-info"
            data-sveltekit-reload>登入</a
          >
        </li>
        <li>
          <a
            href={clientAuth.getBuiltinUISignUpUrl()}
            class="btn btn-dash btn-warning"
            data-sveltekit-reload>注册</a
          >
        </li>
      {:else}
        <li><a href="/items" class="btn btn-dash btn-primary">资源</a></li>
        <li>
          <a
            href={clientAuth.getSignoutUrl()}
            class="btn btn-dash"
            data-sveltekit-replacestate
          >
            <span>{data.userProfile.userRole} | 
              {data.userProfile.name || data.userProfile.email}(
                {data.userProfile.emailFactor?.verified_at ? "已验证" : "未验证"}
              )</span> 登出
          </a>
        </li>
      {/if}
    </ul>
  </div>
</div>

<main>{@render children()}</main>

<style>
  .menu {
    li {
      margin: 0 10px;
    }
  }
</style>
