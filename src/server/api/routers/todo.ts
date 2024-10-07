import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { todoSchema, todoToggleSchema } from "~/types/todo";

export const todoRouter = createTRPCRouter({

    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.todo.findMany()
    }),

    create: publicProcedure.input(todoSchema).mutation(async ({ ctx, input }) => {
        const todo = await ctx.db.todo.create({
            data: {
                text: input.text
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