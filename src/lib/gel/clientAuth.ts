// import createClientAuth, 
//     { type AuthOptions } from "@gel/auth-sveltekit/client"
import createClientAuth, { type AuthOptions } from "$lib/gel/auth-sveltekit/client"
import { getBaseUrl } from "$lib/utils/base-url"

// Auth options
export const options: AuthOptions = {
    baseUrl: getBaseUrl(import.meta.env.VITE_GEL_BASE_URL),
    // The path to the auth route handlers, defaults to 'auth'
    authRoutesPath: import.meta.env.VITE_GEL_AUTH_ROUTE ?? 'auth',
    passwordResetPath: '/identity/reset-password'
}
console.log("auth options:", options)
const auth = createClientAuth(options)
export default auth