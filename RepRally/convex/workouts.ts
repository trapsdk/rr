import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {useConvex} from "convex/react";


export const list = query({
    args: {},


    handler: async (ctx) => {


        const identity = await ctx.auth.getUserIdentity();
        console.log("Identity:", identity);
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        console.log("Subject:", identity.subject);
        return await ctx.db
            .query("workouts")
            .filter(q =>
                q.eq(q.field("userId"), identity.subject))
            .order("asc")
            .collect();
    },
});

export const insert = mutation({
    args: {
        name: v.string(),
        targetReps: v.number()
    },
    handler: async (ctx, args) => {
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) {
            throw new Error("Not authorized")
        }

        // Use the user's ID to insert the workout into the Convex database
        return await ctx.db.insert("workouts", {
            name: args.name,
            targetReps: args.targetReps,
            userId: auth?.subject
        })
    }
})