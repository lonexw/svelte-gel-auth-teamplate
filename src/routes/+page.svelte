<script lang="ts">
  import NextSteps from "$lib/components/NextSteps.svelte";

  let { data } = $props();
</script>

{#if data.message.info || data.message.error}
<div class="p-4">
  <div role="alert" class="alert {data.message.info ? 'alert-info' : ''} {data.message.error ? 'alert-error' : ''} alert-outline">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>{data.message.info || data.message.error}</span>
  </div>
</div>
{/if}

<!-- 项目说明文件, 不需要可以删除 -->
<NextSteps></NextSteps>
