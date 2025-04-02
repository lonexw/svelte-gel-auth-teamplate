// import createClientAuth, 
//     { type AuthOptions } from "@gel/auth-sveltekit/client"
import createClientAuth, { type AuthOptions } from "$lib/gel/auth-sveltekit/client"
// Auth options
export const options: AuthOptions = {
    baseUrl: import.meta.env.VITE_GEL_BASE_URL ?? 'http://localhost:5173',
    // The path to the auth route handlers, defaults to 'auth'
    authRoutesPath: import.meta.env.VITE_GEL_AUTH_ROUTE ?? 'auth',
    passwordResetPath: '/reset-password'
}

const auth = createClientAuth(options)
export default auth