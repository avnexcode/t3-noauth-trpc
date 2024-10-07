import React from 'react'
import TodoList from '~/components/fragments/TodoList'
import TodoForm from '~/components/fragments/TodoForm'

export default function TodoPage() {
    return (
        <>
            <section>
                <div className='px-10 py-10'>
                    <TodoForm />
                </div>
            </section>
            <main>
                <div className='px-10 py-10'>
                    <TodoList />
                </div>
            </main>
        </>
    )
}
