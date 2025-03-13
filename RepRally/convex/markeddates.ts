import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {useConvex} from "convex/react";
import {identity} from "react-native-svg/lib/typescript/lib/Matrix2D";


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
        return await ctx.db.insert("markedDates", {
            userId: auth?.subject,
            date: args.date,
            selected: args.selected,
            marked: args.marked,
            dotColor: args.dotColor,
        })
    }
})