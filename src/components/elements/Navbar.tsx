import Link from 'next/link'
import React from 'react'
import { useTodoStore } from '~/store/todo'

export default function Navbar() {
    const { todoLength } = useTodoStore()
    return (
        <nav className='w-full flex justify-between px-8 py-5 font-sans font-semibold text-xl'>
            <div>
                <h1>Navbar</h1>
            </div>
            <div>
                <ul className='flex gap-7 font-normal'>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/todo">Todo</Link></li>
                </ul>
            </div>
            <div>
                <span>{todoLength}</span>
            </div>
        </nav>
    )
}
