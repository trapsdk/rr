import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { DateTime } from "luxon"; // Install: npm install luxon

export const getMarkedDates = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("Identity:", identity);
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        console.log("Subject:", identity.subject);
        return await ctx.db
            .query("markedDates")
            .filter(q =>
                q.eq(q.field("userId"), identity.subject))
            .collect();
    },
});

export const createMarkedDates = mutation({
    args: {
        date: v.string(),
        selected: v.boolean(),
        marked: v.boolean(),
        dotColor: v.string(),
    },
    handler: async (ctx, args) => {
        const auth = await ctx.auth.getUserIdentity()
        if(!auth) {
            throw new Error("Not authorized")
        }
        // Use the user's ID to insert the workout into the Convex database
        await ctx.db.insert("markedDates", {
            userId: auth?.subject,
            date: args.date,
            selected: args.selected,
            marked: args.marked,
            dotColor: args.dotColor,
        })
    }
});

// Update yesterday’s dots to black

export const updateMarkedDates = mutation(async ({ db }) => {
    const nowUTC = new Date(); // Get current UTC time

    // Fetch all marked dates that have a timeZone field
    const markedDates = await db.query("markedDates").collect();

    for (const dateEntry of markedDates) {
        const userTimeZone = dateEntry.date || "UTC"; // Default to UTC if missing

        // Convert UTC time to user's local time
        const localNow = new Date(
            nowUTC.toLocaleString("en-US", { timeZone: userTimeZone })
        );

        // Check if it's midnight in the user's time zone
        if (localNow.getHours() === 0) {
            const yesterday = new Date(localNow);
            yesterday.setDate(localNow.getDate() - 1);

            const yesterdayISO = yesterday.toISOString().split("T")[0]; // Format YYYY-MM-DD

            if (dateEntry.date === yesterdayISO) {
                await db.patch(dateEntry._id, { dotColor: "black" });
            }
        }
    }
});