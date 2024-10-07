import { z } from 'zod'

export const todoSchema = z.object({
    id: z.string()
        .optional(),
    text: z.string()
        .min(1, 'Todo tidak boleh kosong')
        .min(3, 'Todo minimal 3 huruf')
        .max(100, 'Todo maksimal 100 huruf'),
    status: z.boolean()
        .optional(),
    createdAt: z.date()
        .optional(),
    updatedAt: z.date()
        .optional(),
})

export const todoInputSchema = z.string()
    .min(1, 'Todo tidak boleh kosong')
    .min(3, 'Todo minimal 3 huruf')
    .max(100, 'Todo maksimal 100 huruf')

export const todoToggleSchema = z.object({
    id: z.string(),
    status: z.boolean()
})

export type Todo = z.infer<typeof todoSchema>