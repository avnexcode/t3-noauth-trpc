import { create } from 'zustand'

interface TodoStore {
    todoLength: number
    setTodoLength: (todoLength: number) => void
    todoID: string
    setTodoID: (todoID: string) => void
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
        })
    }
})