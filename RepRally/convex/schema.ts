import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workouts: defineTable({
        name: v.string(),
        userId: v.string(),
    }),
    exercises: defineTable({
        exercise: v.string(),
        workoutId: v.id("workouts"),
        targetReps: v.number(),
        weight: v.number(),
        userId: v.string(),
    }),
});