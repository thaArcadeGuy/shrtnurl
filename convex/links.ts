import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getUserId } from "./auth"

function generateSlug(): string {
  return Math.random().toString(36).substring(2, 8)
}

export const createLink = mutation({
  args: {
    originalUrl: v.string(),
    customSlug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    if (!args.originalUrl.startsWith("http://") && !args.originalUrl.startsWith("https://")) {
      throw new Error("Invalid URL. Must start with http:// or https://")
    }

    const slug: string = args.customSlug ?? generateSlug()
    if (args.customSlug) {
      const existing = await ctx.db
        .query("links")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first()

      if (existing) {
        throw new Error("Slug already taken")
      }
    }

    const linkId = await ctx.db.insert("links", {
      userId,
      originalUrl: args.originalUrl,
      slug,
      clicks: 0,
      qrDownloads: 0,
      createdAt: Date.now(),
    })

    return { slug, linkId }
  }
})

export const getUserLinks = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    const links = await ctx.db
      .query("links")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect()

    return links
  }
})

export const deleteLink = mutation({
  args: {
    linkId: v.id("links"),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx)

    const link = await ctx.db.get(args.linkId)
    if (!link || link.userId !== userId) {
      throw new Error("Not authorized")
    }

    await ctx.db.delete(args.linkId)

    const clicks = await ctx.db
      .query("clicks")
      .withIndex("by_linkId", (q) => q.eq("linkId", args.linkId))
      .collect()

    await Promise.all(clicks.map(click => ctx.db.delete(click._id)))
  },
})

export const getLinksBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx,args) => {
    const link = await ctx.db
      .query("links")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first()

    if (!link) {
      return null
    }

    if (link.expiresAt && link.expiresAt < Date.now()) {
      return {expired: true}
    }

    return link
  }
})

export const trackClick = mutation({
  args: {
    linkId: v.id("links"),
    referrer: v.string(),
    device: v.string(),
    country: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.linkId, {
      clicks: (await ctx.db.get(args.linkId))!.clicks + 1,
    })

    await ctx.db.insert("clicks", {
      linkId: args.linkId,
      timestamp: Date.now(),
      referrer: args.referrer,
      device: args.device,
      country: args.country,
    })
  },
})