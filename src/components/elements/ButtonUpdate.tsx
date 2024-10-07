import React from 'react'
import { Button } from '../ui/button'

export default function ButtonUpdate() {

    return (
        <Button variant={'secondary'} size={'sm'} onClick={(e) => { console.log(e) }}>Update</Button>
    )
}
