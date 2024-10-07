import React from 'react'
import { Input } from '~/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import type { UseFormReturn } from 'react-hook-form'
import type { Todo } from '~/types/todo'

type TodoFormInnerProps = {
    form: UseFormReturn<Todo>
    onSubmit: (values: Todo) => void
}

export default function TodoFormInner(props: TodoFormInnerProps) {
    const { form, onSubmit } = props
    return (
        <Form {...form}>
            <form action="" className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)} id='todo-form'>
                <div>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Todo</FormLabel>
                                <FormControl>
                                    <Input placeholder="input todo here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}