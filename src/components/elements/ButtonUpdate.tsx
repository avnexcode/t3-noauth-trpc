import React from 'react'
import { Button } from '../ui/button'
import { useTodoStore } from '~/store/todo'

type ButtonUpdateProps = {
    todoID: string
}

export default function ButtonUpdate(props: ButtonUpdateProps) {

    const { setTodoID } = useTodoStore()

    return (
        <Button variant={'secondary'} size={'sm'} onClick={() => { setTodoID(props.todoID) }}>Update</Button>
    )
}
