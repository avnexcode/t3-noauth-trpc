import { create } from 'zustand'
import type { Todo } from '~/types/todo'

interface TodoStore {
    todoLength: number
    setTodoLength: (todoLength: number) => void
    todoID: string
    setTodoID: (todoID: string) => void
    todoData: Todo | null
    setTodoData: (todo: Todo) => void
}

export const useTodoStore = create<TodoStore>((set) => {
    return {
        todoLength: 0,
        setTodoLength: todoLength => set(() => {
            return { todoLength }
        }),
        todoID: '',
        setTodoID: todoID => set(() => {
            return { todoID }
        }),
        todoData: null,
        setTodoData: (todoData) => set(() => {
            console.log(todoData)
            return { todoData }
        })

    }
})