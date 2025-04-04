<script>
  import ForgotPasswordForm from "$lib/components/auth/ForgotPasswordForm.svelte";

  let { data, form } = $props();
  let email = $state("");
  if (data.isSignedIn) {
    email = data.userProfile.email
  }
</script>

<div class="flex items-center justify-center p-6">
  <div class="card">
    <h1 class="card-title">Send password reset email</h1>
    <div class="card-body">
      {#if data.providers.emailPassword && data.userProfile.email}
        <ForgotPasswordForm error={form?.error} message={form?.message} bind:email={email} />
      {:else}
        <div class="text-slate-500 italic w-[14rem]">
          Email+Password provider is not enabled or not bind email(oauth provider).
        </div>
      {/if}
    </div>
  </div>
</div>
