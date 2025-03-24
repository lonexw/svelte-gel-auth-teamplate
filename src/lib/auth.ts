import createClientAuth, 
    { type AuthOptions } from "@gel/auth-sveltekit/client"
import { getBaseUrl } from "../utils/base-url";

export const options: AuthOptions = {
    baseUrl: getBaseUrl()
}
const auth = createClientAuth(options)
export default auth