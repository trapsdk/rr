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
        title: v.string(),
        date: v.string(),
        dotColor: v.string(),
        marked: v.boolean(),
    }),
    tomorrowDate: defineTable({
        tommorrowDate: v.string(),
    })
});