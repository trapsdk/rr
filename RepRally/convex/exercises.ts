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
            .query("exercises")
            .filter(q =>
                q.eq(q.field("userId"), identity.subject))
            .order("asc")
            .collect();
    },
});

export const addExercise = mutation({
    args: {
        exercise: v.string(),
        targetReps: v.number(),
        weight: v.number(),
        workoutId: v.any(),
    },
    handler: async (ctx, args) => {
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) {
            throw new Error("Not authorized")
        }
        return await ctx.db.insert("exercises", {
            exercise: args.exercise,
            targetReps: args.targetReps,
            weight: args.weight,
            userId: auth?.subject,
            workoutId: args.workoutId
        })

    }

})