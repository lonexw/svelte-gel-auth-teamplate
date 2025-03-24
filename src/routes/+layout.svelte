<script lang="ts">
  import "../app.css"
  import auth from "$lib/auth"

  let { children, data } = $props()
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="flex-1">
    <a class="btn btn-ghost text-xl" href="https://github.com/lonexw/svelte-gel-auth-teamplate">🚀 Svelte + Gel Auth Teamplate</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
			{#if !data.isSignedIn}
			<li><a href={auth.getBuiltinUIUrl()} class="btn btn-dash">登陆</a></li>
      <li><a href={auth.getBuiltinUISignUpUrl()} class="btn btn-dash">注册</a></li>
			{:else}
			<li><a href="/dashbord" class="btn btn-dash">资源</a></li>
			<li><a href={auth.getSignoutUrl()} class="btn btn-dash">登出</a></li>
			{/if}
    </ul>
  </div>
</div>

<main> {@render children()} </main>


<style>
	.menu {
		li {
			margin: 0 10px;
		}
	}
</style>