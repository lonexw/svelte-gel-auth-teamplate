<script lang="ts">
  let { data } = $props();
</script>

<div class="p-6">
  <div class="flex justify-between items-center w-full">
    <h1>Items [{data.items.length}]</h1>
    <a href="/items/new" class="btn btn-primary"> + New Item </a>
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
