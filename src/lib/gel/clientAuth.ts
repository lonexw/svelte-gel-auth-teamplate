import createClientAuth, 
    { type AuthOptions } from "@gel/auth-sveltekit/client"
import { getBaseUrl } from "../utils/base-url";

// Auth options
export const options: AuthOptions = {
    baseUrl: getBaseUrl(),  // The url of your application
    // The path to the auth route handlers, defaults to 'auth'
    authRoutesPath: import.meta.env.VITE_GEL_AUTH_ROUTE ?? 'auth',
    passwordResetPath: '/reset-password'
}

const auth = createClientAuth(options)
export default auth