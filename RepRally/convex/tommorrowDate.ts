import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTomorrowDate = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("tomorrowDate")
            .collect();
    },
});
export const createTomorrowDate = mutation({
    args: {
        date: v.string(),
    },
    handler: async (ctx, args) => {
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) {
            throw new Error("Not authorized")
        }
        await ctx.db.insert("tomorrowDate",
            {tommorrowDate: args.date,}
        )
    }
})

