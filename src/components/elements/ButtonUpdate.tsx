import React from 'react'
import { Button } from '../ui/button'
import { useTodoStore } from '~/store/todo'

type ButtonUpdateProps = {
    todoID: string
    btnDisable: boolean
}

export default function ButtonUpdate(props: ButtonUpdateProps) {
    const { setTodoID } = useTodoStore()

    return (
        <Button variant={'secondary'} size={'sm'} onClick={() => { setTodoID(props.todoID) }} disabled={props.btnDisable}>{props.btnDisable ? 'On Update' : 'Update'}</Button>
    )
}
