import React, { useEffect } from 'react'
import TodoFormInner from './TodoFormInner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchema } from '~/types/todo/index'
import { Button } from '../ui/button'
import { api } from '~/utils/api'
import { toast } from '~/hooks/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import type { Todo } from '~/types/todo'
import { useTodoStore } from '~/store/todo'

export default function TodoForm() {
    const { refetch: todoRefetch } = api.todo.getAll.useQuery()
    const { mutate: createTodo, isPending: todoCreatePending } = api.todo.create.useMutation({
        onSettled: async () => {
            await todoRefetch()
            form.reset()
            toast({
                title: "Success",
                description: `Success Create New Todo at ${Date.now()}`,
            })
        }
    })

    const { mutate: updateTodo, isPending: todoUpdatePending } = api.todo.update.useMutation({
        onSettled: async () => {
            await todoRefetch()
            setTodoID('')
            form.reset()
            toast({
                title: "Success",
                description: `Success Update Todo at ${Date.now()}`,
            })
        }
    })

    const form = useForm<Todo>({
        defaultValues: {
            text: ''
        },
        resolver: zodResolver(todoSchema)
    })

    const { todoID, setTodoID } = useTodoStore()
    const { data: todo } = api.todo.getOne.useQuery(todoID)

    useEffect(() => {
        if (todoID && todo) {
            form.setValue('text', todo.text)
        }
    }, [todoID, form, todo])

    const onSubmit = (values: Todo) => {
        if (!todoID) {
            createTodo(values);
        } else {
            updateTodo({ id: todoID, text: values.text });
        }
    };

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
                {todoID ?
                    <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoUpdatePending} className='disabled:bg-slate-500'>{todoUpdatePending ? 'Updating...' : 'Update'}</Button> :
                    <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoCreatePending} className='disabled:bg-slate-500'>{todoCreatePending ? 'Sending...' : 'Post'}</Button>
                }
            </CardFooter>
        </Card>

    )
}