import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// --- Queries ---

// Get all brews for a specific bean
export const getBrewsByBeanId = query({
    args: { beanId: v.id("beans") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("brews")
            .withIndex("by_beanId", (q) => q.eq("beanId", args.beanId))
            .collect();
    },
});

// Get all brews for the current user (once auth is set up) - for now, just get all brews
export const getAllBrews = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("brews").collect();
    },
});

// Get a single brew by ID
export const getBrewById = query({
    args: { id: v.id("brews") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// --- Mutations ---

// Create a new brew log entry
export const createBrew = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const brewId = await ctx.db.insert("brews", {
            beanId: args.beanId,
            method: args.method,
            waterTempC: args.waterTempC,
            grindSize: args.grindSize,
            coffeeWeightG: args.coffeeWeightG,
            waterWeightG: args.waterWeightG,
            brewTimeSeconds: args.brewTimeSeconds,
            rating: args.rating,
            notes: args.notes,
            imageUrl: args.imageUrl,
            brewDate: Date.now(),
            // userId: ctx.auth.getUserIdentity()?.tokenIdentifier // For later when we have auth
        });
        return brewId;
    },
});

// Update an existing brew log entry
export const updateBrew = mutation({
    args: {
        id: v.id("brews"),
        method: v.optional(v.string()),
        waterTempC: v.optional(v.number()),
        grindSize: v.optional(v.string()),
        coffeeWeightG: v.optional(v.number()),
        waterWeightG: v.optional(v.number()),
        brewTimeSeconds: v.optional(v.number()),
        rating: v.optional(v.number()),
        notes: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    }
});

// Delete a brew log entry
export const deleteBrew = mutation({
    args: { id: v.id("brews") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
