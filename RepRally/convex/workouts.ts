import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {useConvex} from "convex/react";
import {identity} from "react-native-svg/lib/typescript/lib/Matrix2D";


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
export const getExercisesByWorkout = query({
    args: {
        title: v.string(), // Selected workout title
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        // Fetch the workout that matches the userId and title
        const workout = await ctx.db
            .query("workouts")
            .filter((q) => q.eq(q.field("userId"), identity.subject)) // Filter by userId
            .filter((q) => q.eq(q.field("title"), args.title)) // Filter by title
            .first(); // Get the first matching workout

        if (!workout) {
            return null; // Return null if no workout is found
        }

        return workout.exercises; // Return the exercises array
    },
});



export const createWorkout = mutation({
    args: {
        title: v.string(),
        exercises: v.array(v.object({
            name: v.string(),
            sets: v.number(),
            reps: v.number(),
        }))
    },
    handler: async (ctx, args) => {
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) {
            throw new Error("Not authorized")
        }

        // Use the user's ID to insert the workout into the Convex database
        return await ctx.db.insert("workouts", {
            title: args.title,
            userId: auth?.subject,
            exercises: args.exercises,
        })
    }
})