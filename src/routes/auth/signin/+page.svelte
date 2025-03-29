<script lang="ts">
  import clientAuth from "$lib/auth";
  import SignInForm from "$lib/components/auth/SignInForm.svelte";

  const providerIcons = {
    "builtin::oauth_apple": "apple",
    "builtin::oauth_azure": "microsoft-azure",
    "builtin::oauth_github": "github",
    "builtin::oauth_google": "google",
  };
  let { data } = $props();
  let form: any;
  // let params: any = data.params;
</script>

<div class="flex items-center justify-center p-6">
  <div class="card w-1/2 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Sign In with Email & Password</h2>
      {#if data.providers.emailPassword}
        <SignInForm error={form?.error} />
      {:else}
        <p>Email+Password provider is not enabled</p>
      {/if}

      <div class="flex flex-col gap-4 w-[18rem]">
        <h2 class="text-xl font-semibold">OAuth</h2>
        <!-- {#if params.oauth_error}
          <div class="bg-rose-100 text-rose-950 px-4 py-3 rounded-md">
            {params.oauth_error}
          </div>
        {/if} -->

        {#if data.providers.oauth.length}
          {#each data.providers.oauth as provider (provider.name)}
            <a
              href={clientAuth.getOAuthUrl(provider.name)}
              class="rounded-lg bg-slate-50 p-3 font-medium shadow-md shrink-0 hover:bg-white hover:scale-[1.03] transition-transform
    flex items-center"
            >
              <!-- <Icon icon={`mdi:${providerIcons[provider.name]}`} /> -->
              <span class="ml-3">{provider.display_name}</span>
            </a>
          {/each}
        {:else}
          <div class="text-slate-500 italic w-[14rem]">
            No OAuth providers configured
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
