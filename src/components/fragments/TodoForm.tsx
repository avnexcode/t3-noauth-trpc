import React from 'react'
import TodoFormInner from './TodoFormInner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema } from '~/types/todo/index'
import { Button } from '../ui/button'
import { api } from '~/utils/api'
import { toast } from '~/hooks/use-toast'
import type { Todo } from '~/types/todo'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export default function TodoForm() {
    const { refetch: todoRefetch } = api.todo.getAll.useQuery()
    const { mutate: createTodo, isPending: todoPending } = api.todo.create.useMutation({
        onSettled: async () => {
            await todoRefetch()
            form.reset()
            toast({
                title: "Success",
                description: `Success Create New Todo at ${Date.now()}`,
            })
        }
    })

    const form = useForm<Todo>({
        defaultValues: {
            text: ''
        },
        resolver: zodResolver(todoSchema)
    })

    const onSubmit = (values: Todo) => createTodo(values)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Todo Form</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <TodoFormInner form={form} onSubmit={onSubmit} />
            </CardContent>
            <CardFooter className='flex justify-end'>
                <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoPending} className='disabled:bg-slate-500'>{todoPending ? 'Sending..' : 'Post'}</Button>
            </CardFooter>
        </Card>

    )
}