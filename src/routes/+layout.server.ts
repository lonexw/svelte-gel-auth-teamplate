import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = locals.auth.session
    const isSignedIn = await session.isSignedIn()

    return {
        isSignedIn,
    }
}