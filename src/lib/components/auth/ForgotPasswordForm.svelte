<script lang="ts">
  import SubmitButton from "./SubmitButton.svelte";
  import { enhance } from "$app/forms";

  let { email=$bindable(), message, error } = $props();
</script>

<form class="flex flex-col w-[22rem]" method="post" use:enhance>
  {#if error}
    <div class="bg-rose-100 text-rose-950 px-4 py-3 rounded-md mb-3">
      {error}
    </div>
  {/if}
  {#if message}
    <div class="bg-sky-200 text-sky-950 px-4 py-3 rounded-md mb-3">
      {message}
    </div>
  {:else}
    <label for="email" class="font-medium text-sm mb-1 ml-2"> Email </label>
    <input
      type="email"
      id="email"
      name="email"
      value={email}
      required
      class="border border-slate-200 rounded-lg mb-4 px-4 py-3 outline-teal-600 outline-2 focus:outline"
    />
    <SubmitButton label="Send reset email" />
  {/if}
</form>
