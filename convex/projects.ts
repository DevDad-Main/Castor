import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { verifyAuth } from "./auth"

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx)

    const projectId = await ctx.db.insert("projects", {
      name: args.name,
      ownerId: identity?.subject,
      updatedAt: Date.now(),
    })
  },
})

export const getPartial = query({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await verifyAuth(ctx)

    return await ctx.db
      .query("projects")
      // Allows us to match users with their own created projects, not every project in the db
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .take(args.limit)
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await verifyAuth(ctx)

    return await ctx.db
      .query("projects")
      // Allows us to match users with their own created projects, not every project in the db
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .collect()
  },
})
