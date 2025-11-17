import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
    // Table for coffee beans
    beans: defineTable({
        name: v.string(),
        roaster: v.string(),
        origin: v.string(),
        roastLevel: v.union(
            v.literal("Light"),
            v.literal("Medium-Light"),
            v.literal("Medium"),
            v.literal("Medium-Dark"),
            v.literal("Dark")
        ),
        tastingNotes: v.array(v.string()),
        // userId: v.id("users"), // Once user auth is set up
    })
        .searchIndex("by_name", {
            searchField: "name"
        })
        .searchIndex("by_roaster", {
            searchField: "roaster"
        }),

    // Table for individual brew logs
    brews: defineTable({
        beanId: v.id("beans"),
        method: v.string(),
        waterTempC: v.number(),
        grindSize: v.string(),
        coffeeWeightG: v.number(),
        waterWeightG: v.number(),
        brewTimeSeconds: v.number(),
        rating: v.number(),
        notes: v.string(),
        imageUrl: v.optional(v.string()),
        // userId: v.id("users"), // Once user auth is set up
        brewDate: v.number(),
    })
        .index("by_beanId", ["beanId"])
        .index("by_brewDate", ["brewDate"]),

    // We'll add a 'users' table later when we integrate authentication
    // users: defineTable({
    //   tokenIdentifier: v.string(), // From WorkOS.
    //   name: v.string(),
    //   email: v.string(),
    // }),
});
