import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  links: defineTable({
    userId: v.string(),
    originalUrl: v.string(),
    slug: v.string(),
    clicks: v.number(),
    qrDownloads: v.number(),
    createdAt: v.number(),
    expiresAt: v.optional(v.number()),
    status: v.optional(v.union(v.literal('active'), v.literal('expired'))),
  }).index("by_userId", ["userId"])
    .index("by_slug", ["slug"]),

  clicks: defineTable({
    linkId: v.id("links"),
    timestamp: v.number(),
    referrer: v.string(),
    device: v.string(),
    country: v.string(),
  }).index("by_linkId", ["linkId"])
})