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

    const { todoID, setTodoID, setTodoData } = useTodoStore()

    const form = useForm<Todo>({
        defaultValues: {
            text: ''
        },
        resolver: zodResolver(todoSchema)
    })

    const { refetch: todoRefetch } = api.todo.getAll.useQuery()

    const { mutate: createTodo, isPending: todoCreatePending } = api.todo.create.useMutation({
        onMutate: (todo) => {
            if (todo) {
                setTodoData({ text: todo.text })
            }
        },
        onSuccess: () => {
            form.reset()
            setTodoData(null!)
            toast({
                title: "Success",
                description: `Success Create New Todo at ${Date.now()}`,
            })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to create todo: ${error.message}`,
                variant: "destructive",
            });
        },
        onSettled: async () => {
            await todoRefetch()
        }
    })

    const { mutate: updateTodo, isPending: todoUpdatePending } = api.todo.update.useMutation({
        onMutate: (todo) => {
            if (todo) {
                setTodoData({ text: todo.text })
            }
        },
        onSuccess: () => {
            setTodoID('')
            form.reset()
            setTodoData(null!)
            toast({
                title: "Success",
                description: `Success Update Todo at ${Date.now()}`,
            })
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: `Failed to create todo: ${error.message}`,
                variant: "destructive",
            });
        },
        onSettled: async () => {
            await todoRefetch()
        }
    })

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
                    <div className='flex gap-3'>
                        <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoUpdatePending} className='disabled:bg-slate-500'>{todoUpdatePending ? 'Updating...' : 'Update'}</Button>
                        <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoUpdatePending} className='disabled:bg-slate-500' onClick={() => { setTodoID(''); form.setValue('text', '') }}>Cancel</Button>
                    </div>
                    :
                    <Button variant={'default'} size={'sm'} type='submit' form='todo-form' disabled={todoCreatePending} className='disabled:bg-slate-500'>{todoCreatePending ? 'Sending...' : 'Post'}</Button>
                }
            </CardFooter>
        </Card>

    )
}