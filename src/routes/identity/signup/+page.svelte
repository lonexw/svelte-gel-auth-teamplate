<script lang="ts">
  import ResendVerificationEmail from "$lib/components/auth/ResendVerificationEmail.svelte";
  import SignUpForm from "$lib/components/auth/SignUpForm.svelte";

  let { data, form } = $props();
</script>

<div class="flex items-center justify-center p-6">
  <div class="card w-1/2 shadow-sm">
    <div class="card-body">
      <h2 class="card-title">Sign up: Email+Password</h2>
      <!-- {#if data.params.email_verification_error}
        <div
          class="bg-rose-100 text-rose-950 px-4 py-3 rounded-md w-[22rem] flex flex-col items-start"
        >
          {data.params.email_verification_error}
          {#if data.params.verification_token}
            <ResendVerificationEmail
              error={form?.error}
              message={form?.message}
              verificationToken={Array.isArray(data.params.verification_token)
                ? data.params.verification_token[0]
                : data.params.verification_token}
            />
          {/if}
        </div>
      {/if} -->
      {#if data.providers.emailPassword}
        <SignUpForm error={form?.error} message={form?.message} />
      {:else}
        <div class="text-slate-500 italic w-[14rem]">
          Email+Password provider is not enabled
        </div>
      {/if}
    </div>
  </div>
</div>
