export const load = async ({ locals }) => {
    const session = locals.auth.session
    const isSignedIn = await session.isSignedIn()
    const builtinUIEnabled = await session.client.queryRequiredSingle<boolean>(
        `select exists ext::auth::UIConfig`
    )

    return {
        builtinUIEnabled,
        isSignedIn,
    }
}