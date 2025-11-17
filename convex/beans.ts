import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// --- Queries ---

// Get all coffee beans
export const getBeans = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("beans").collect();
    },
});

//Get a single coffee bean by ID
export const getBeanById = query({
    args: { id: v.id("beans") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

// --- Mutations ---

// Create a new coffee bean
export const createBean = mutation({
    args: {
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
    },
    handler: async (ctx, args) => {
        const beanId = await ctx.db.insert("beans", {
            name: args.name,
            roaster: args.roaster,
            origin: args.origin,
            roastLevel: args.roastLevel,
            tastingNotes: args.tastingNotes,
            // userId: ctx.auth.getUserIdentity()?.tokenIdentifier // For later when we have auth
        });
        return beanId;
    },
});

// Update an existing coffee bean
export const updateBean = mutation({
    args: {
        id: v.id("beans"),
        name: v.optional(v.string()),
        roaster: v.optional(v.string()),
        origin: v.optional(v.string()),
        roastLevel: v.optional(
            v.union(
                v.literal("Light"),
                v.literal("Medium-Light"),
                v.literal("Medium"),
                v.literal("Medium-Dark"),
                v.literal("Dark")
            )
        ),
        tastingNotes: v.optional(v.array(v.string())),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args;
        await ctx.db.patch(id, updates);
    },
});

// Delete a coffee bean
export const deleteBean = mutation({
    args: { id: v.id("beans") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
