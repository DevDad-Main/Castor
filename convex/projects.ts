import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    await ctx.db.insert("projects", {
      name: args.name,
      ownerId: identity?.subject,
    })
  },
})

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    // Returns no project data if not authenticated
    if (!identity) {
      return []
    }

    return await ctx.db
      .query("projects")
      // Allows us to match users with their own created projects, not every project in the db
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .collect()
  },
})
