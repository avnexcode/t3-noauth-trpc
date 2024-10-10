import React, { useEffect } from 'react'
import TodoCard from '../elements/TodoCard'
import { api } from '~/utils/api'
import type { Todo } from '~/types/todo'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import { useTodoStore } from '~/store/todo'

const renderElement = (todos: Todo[]) => todos.map(todo => <TodoCard key={todo.id} todo={todo} />)

export default function TodoList() {

    const { setTodoLength, todoData: globalTodoData } = useTodoStore()

    const { data: todoData, isLoading } = api.todo.getAll.useQuery()

    useEffect(() => {
        if (todoData) {
            setTodoLength(todoData.length)
        }
    }, [todoData, setTodoLength])

    return (
        <Table>
            <TableCaption>A list of your todos.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className='text-left'>Todo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                    </TableRow>
                ) : todoData && todoData.length > 0 ? (
                    renderElement(todoData)
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">No todos available.</TableCell>
                    </TableRow>
                )}
                {
                    globalTodoData ? <TodoCard key={globalTodoData.id} todo={globalTodoData} className='opacity-50'/> : null
                }
            </TableBody>
        </Table>
    )
}