import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workouts: defineTable({
        title: v.string(),
        userId: v.string(),

        exercises: v.array(v.object({
            name: v.string(),
            sets: v.number(),
            reps: v.number(),
        }))
    }),
    exercises: defineTable({
        exercise: v.string(),
        workoutId: v.id("workouts"),
        targetReps: v.number(),
        weight: v.number(),
        userId: v.string(),
    }),
});