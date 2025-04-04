<script>
  import ResetPasswordForm from "$lib/components/auth/ResetPasswordForm.svelte";

  let { data, form } = $props();
</script>

{#if data.isSignedIn}
<div class="flex items-center justify-center p-6">
  <div class="card">
    <h1 class="card-title">Send password reset email</h1>
    <div class="card-body">
      {#if data.providers.emailPassword && data.userProfile.email}
        {#if data.resetToken && data.isTokenValid}
          <ResetPasswordForm error={form?.error} resetToken={data.resetToken} />
        {:else}
          <div
            class="bg-rose-100 text-rose-950 px-4 py-3 rounded-md mb-3 w-[22rem]"
          >
            Reset token is invalid, it may have expired.{" "}
            <a href="/identity/forgot-password" class="text-sky-600">
              Try sending another reset email
            </a>
          </div>
        {/if}
      {:else}
        <div class="text-slate-500 italic w-[14rem]">
          Email+Password provider is not enabled or not bind email(oauth provider).
        </div>
      {/if}
    </div>
  </div>
</div>
{:else}
<p class="p-10 text-center">You need signin first.</p>
{/if}
