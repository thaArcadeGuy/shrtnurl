import type { MutationCtx, QueryCtx } from "./_generated/server"

export const getUserId = async (ctx: MutationCtx | QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error("Not authenticated - please sign in again")
  }
  return identity.subject
}