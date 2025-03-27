import { fail, redirect } from "@sveltejs/kit";
import e from "$db/edgeql-js";
import { parseError } from "$lib/utils/error";

export const load = async ({ locals }) => {
  const session = locals.auth.session;
  const items = await e
    .select(e.Item, () => ({
      id: true,
      name: true,
      created: true,
      updated: true,
      created_by: {
        name: true,
        email: true,
      },
    }))
    .run(session.client);
    console.log(items);
  return {
    items,
  };
};

export const actions = {
  newItem: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      await locals.auth.session.client.query(
        "with name := <str>$name insert Item { name := name }",
        {
          name: formData.get("name"),
        }
      );
    } catch (e) {
      return fail(400, {
        error: `Error signing up: ${parseError(e)}`,
      });
    }
  },
  deleteItem: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      await locals.auth.session.client.query(
        "delete Item filter .id = <uuid>$id",
        {
          id: formData.get("id"),
        }
      );
    } catch (e) {
      return fail(400, {
        error: `Error deleting item: ${parseError(e)}`,
      });
    }
  }
};
