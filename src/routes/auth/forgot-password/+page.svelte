<script>
  import ForgotPasswordForm from "$lib/components/auth/ForgotPasswordForm.svelte";

  export let data;
  export let form;
</script>

<div class="flex items-center justify-center p-6">
  <div class="card">
    <h1 class="card-title">Send password reset email</h1>
    <div class="card-body">
      {#if data.providers.emailPassword}
        <ForgotPasswordForm error={form?.error} message={form?.message} />
      {:else}
        <div class="text-slate-500 italic w-[14rem]">
          Email+Password provider is not enabled
        </div>
      {/if}
    </div>
  </div>
</div>
