import createClientAuth, 
    { type AuthOptions } from "@gel/auth-sveltekit/client"
import { getBaseUrl } from "./utils/base-url";

// Auth options
export const options: AuthOptions = {
    baseUrl: getBaseUrl(),
    authRoutesPath: 'gel',
    passwordResetPath: '/reset-password'
}

const auth = createClientAuth(options)
export default auth