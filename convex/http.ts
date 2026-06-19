import { httpRouter } from "convex/server"
import { httpAction } from "./_generated/server"
import { internal } from "./_generated/api"

const http = httpRouter()

http.route({
  pathPrefix: "/",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url)
    const rawSlug = url.pathname.slice(1)
    const slug = decodeURIComponent(rawSlug).replace(/[^a-zA-Z0-9-]/g, "")

    if (!slug) {
      return new Response("Not found", { status: 404 })
    }

    const link = await ctx.runQuery(internal.links.internalGetLinkBySlug, { slug })

    if (!link) {
      return new Response("Link not found", { status: 404 })
    }

    if ('expired' in link && link.expired === true) {
      return new Response("This link has expired", { status: 410 })
    }

    const userAgent = request.headers.get("user-agent") || ""
    const referrer = request.headers.get("referer") || "direct"
    const country = request.headers.get("cf-ipcountry") || "Unknown"

    let device = "Desktop"
    if (/(tablet|ipad)/i.test(userAgent)) device = "Tablet"
    if (/(mobile|android|iphone)/i.test(userAgent)) device = "Mobile"

    await ctx.scheduler.runAfter(0, internal.links.trackClick, {
      linkId: link._id,
      referrer,
      device,
      country
    })

    return new Response(null, {
      status: 302,
      headers: {
        "Location": link.originalUrl,
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
      }
    })
  }),
})

export default http