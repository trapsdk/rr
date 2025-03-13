import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    workouts: defineTable({
        title: v.string(),
        userId: v.string(),
        exercises: v.array(
            v.object({
            name: v.string(),
            sets: v.number(),
            reps: v.number(),
            weight: v.number(),
        }))
    }),
    markedDates: defineTable({
        userId: v.string(),
        date: v.string(),
        selected: v.boolean(),
        marked: v.boolean(),
        dotColor: v.string(),
    }),
});