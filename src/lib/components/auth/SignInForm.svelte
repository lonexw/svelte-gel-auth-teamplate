<script lang="ts">
  import { enhance } from "$app/forms";
  import SubmitButton from "./SubmitButton.svelte";

  let { email, password, error } : {
    email?: string,
    password?: string | undefined,
    error: string | undefined
  } = $props();
</script>

<form class="flex flex-col w-full" method="post" use:enhance>
  {#if error}
    <div class="bg-rose-100 text-rose-950 px-4 py-3 rounded-md mb-3">
      {error}
    </div>
  {/if}

  <label for="email" class="font-medium text-sm mb-1 ml-2"> Email </label>
  <input
    autocomplete="email"
    type="email"
    id="email"
    name="email"
    bind:value={email}
    required
    class="border border-slate-200 rounded-lg mb-4 px-4 py-3 outline-teal-600 outline-2 focus:outline "
  />
  <div class="flex text-sm">
    <label for="password" class="font-medium mb-1 ml-2"> Password </label>
    <a
      href="/identity/forgot-password"
      class="ml-auto text-teal-600 hover:text-teal-700"
    >
      Forgot password?
    </a>
  </div>
  <input
    autocomplete="new-password"
    type="password"
    id="password"
    name="password"
    bind:value={password}
    required
    class="border border-slate-200 rounded-lg mb-4 px-4 py-3 outline-teal-600 outline-2 focus:outline "
  />
  <SubmitButton label="Sign in" />

  <div class="text-slate-500 mt-3">
    Don't have an account?{" "}
    <a href="/identity/signup" class="text-teal-600 hover:text-teal-700">
      Sign up
    </a>
  </div>
</form>
