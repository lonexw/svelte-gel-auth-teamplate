<script lang="ts">
  import { Accordion, Button } from "bits-ui";

  let itemName = $state("");
  const setItemName = async function (name: string | null) {
    if (name != null) {
      itemName = name;
    }
  };
</script>

<Button.Root>Click me</Button.Root>
<Accordion.Root>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger
        id="accordion-trigger"
        data-test-id="accordion-trigger-id"
        onclick={(e: Event) => {
          const target = e.target as HTMLButtonElement;
          console.log("Accordion Trigger clicked", target);
        }}>
        {#snippet child({ props })}
          {console.log(props)}
		      <button {...props}>Open accordion item</button>
	      {/snippet}
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>First accordion content</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Header>
      <Accordion.Trigger>Second</Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content>Second accordion content</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
<div class="card">
  <form
    action="/items?/newItem"
    method="post"
    class="w-full flex justify-center flex-col"
  >
    <div class="">
      <div class="pb-4 border-b border-gray-200">
        <h2>New Item</h2>

        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="name"> Name </label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary sm:max-w-md"
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="w-full"
                  placeholder="test item"
                  value={itemName}
                  onchange={(e: Event) => {
                    const target = e.target as HTMLInputElement;
                    setItemName(target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <a href="/items" class="btn btn-link"> Cancel </a>
      <button type="submit" value="newItem" class="btn btn-success">
        Save
      </button>
    </div>
  </form>
</div>

<style>
  .card {
    width: 300px;
    margin: auto;
  }
</style>
