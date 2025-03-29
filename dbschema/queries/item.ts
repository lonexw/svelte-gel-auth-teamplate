import e from "../edgeql-js";
import type { Client } from "gel";

export async function getItems(client: Client, params: any): Promise<any[]> {
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
    .run(client);
  return items;
}

export async function newItem(client: Client, params: any): Promise<any> {
  const item = await e
    .insert(e.Item, {
      name: params.name,
    })
    .run(client);
  return item;
}

export async function deleteItem(client: Client, params: any): Promise<any> {
  const item = await e
    .delete(e.Item, (item) => ({
      filter_single: e.op(item.id, "=", e.uuid(params.id)),
    }))
    .run(client);
  return item;
}
