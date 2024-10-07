import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todoSchema, todoToggleSchema } from "~/types/todo";

export const todoRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.todo.findMany()
    }),

    getOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.findUnique({ where: { id: input } })
        return todo
    }),

    create: publicProcedure.input(todoSchema).mutation(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.create({
            data: {
                text: input.text.toLowerCase()
            }
        })
        return todo
    }),

    update: publicProcedure.input(todoSchema).mutation(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.update({
            where: { id: input.id }, 
            data: {
                text: input.text.toLowerCase()
            }
        })
        return todo
    }),

    toggle: publicProcedure.input(todoToggleSchema).mutation(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.update({
            where: { id: input.id },
            data: {
                status: input.status

            }
        })
        return todo
    }),

    delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.delete({
            where: {
                id: input
            }
        })
        return todo
    })
})