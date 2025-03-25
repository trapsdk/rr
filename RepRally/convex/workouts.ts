import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("Identity:", identity);
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        // console.log("Subject:", identity.subject);
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
        workoutId: v.id("workouts"),
    },
    handler: async (ctx, args) => {
        const workout = await ctx.db.get(args.workoutId);
        return workout;
    },
});

export const createWorkout = mutation({
    args: {
        title: v.string(),
        exercises: v.array(v.object({
            name: v.string(),
            sets: v.number(),
            reps: v.number(),
            weight: v.number(),
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

export const updateWorkoutExercises = mutation({
    args: {
        workoutId: v.id("workouts"),
        exercises: v.array(v.object({
            name: v.string(),
            sets: v.number(),
            reps: v.number(),
            weight: v.number(),
        })),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.workoutId, {
            exercises: args.exercises,
        });
    },
});

export const deleteWorkout = mutation({
    args: { id: v.id("workouts") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});