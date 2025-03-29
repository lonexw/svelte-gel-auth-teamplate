import { fail } from "@sveltejs/kit";
import { getItems, newItem, deleteItem } from "$db/queries/item";
import { parseError } from "$lib/utils/error";

export const load = async ({ locals }) => {
  const session = locals.auth.session;
  return {
    items: await getItems(session.client, {}),
  };
};

export const actions = {
  newItem: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      await newItem(locals.auth.session.client, {
        name: formData.get("name"),
      });
    } catch (e) {
      return fail(400, {
        error: `Error signing up: ${parseError(e)}`,
      });
    }
  },
  deleteItem: async ({ request, locals }) => {
    try {
      const formData = await request.formData();
      const res = await deleteItem(locals.auth.session.client, {
        id: formData.get("id"),
      });
      if (res === null) {
        throw new Error("没有删除该资源的权限");
      }
      
    } catch (e) {
      return fail(400, {
        error: `Error deleting item: ${parseError(e)}`,
      });
    }
  }
};
