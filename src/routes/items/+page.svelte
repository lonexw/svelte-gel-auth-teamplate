<script lang="ts">
  let { data, form } = $props();
</script>

<div class="p-6">
  {#if form?.error}
  <div role="alert" class="alert alert-error alert-outline mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>{form?.error}</span>
  </div>
  {/if}
  <div class="flex justify-between items-center w-full">
    <h1>Items [{data.items.length}]</h1>
    <div>
      {#if data.userProfile}
      <a href="/items/new" class="btn btn-primary"> + New Item </a>
        {#if !data.userProfile.emailFactor}
        <a href="/identity/signup" class="btn btn-warning" data-sveltekit-reload>📨 绑定邮箱登录</a>
        {/if}
      {/if}
    </div>
  </div>

  <ul role="list" class="divide-y divide-gray-200">
    {#each data.items as item}
      <li data-key={item.id} class="flex gap-x-4 py-5">
        <div class="flex-auto">
          <div class="flex items-baseline justify-between gap-x-4">
            <p class="text-sm font-semibold leading-">
              {item.name}
            </p>
            <p class="flex-none text-x">
              <time dateTime={item.updated?.toLocaleDateString()}>
                {item.updated?.toLocaleDateString()}
              </time>
            </p>
          </div>
          <div>
            <p class="mt-1 line-clamp-2 text-sm leading-6">
              Author: {item.created_by.name}
            </p>
            <form action="/items?/deleteItem" method="post">
              <input type="text" name="id" value={item.id} hidden />
              <button
                type="submit"
                value="deleteItem"
                class="text-sm font-semibold text-red-600 mt-2"
              >
                Delete
                <span class="sr-only">Delete</span>
              </button>
            </form>
          </div>
        </div>
      </li>
    {/each}
  </ul>
</div>
