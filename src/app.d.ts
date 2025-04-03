// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ServerRequestAuth } from "$lib/gel/auth-sveltekit/client";

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: ServerRequestAuth;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
