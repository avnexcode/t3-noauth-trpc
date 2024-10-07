import React from 'react'
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

const renderElement = (todos: Todo[]) => todos.map(todo => <TodoCard key={todo.id} todo={todo} />)

export default function TodoList() {

    const { data: todoData, isLoading } = api.todo.getAll.useQuery()

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
            </TableBody>
        </Table>
    )
}
