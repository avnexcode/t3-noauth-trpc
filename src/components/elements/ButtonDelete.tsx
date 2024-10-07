import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from '../ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { api } from '~/utils/api';
import { toast } from '~/hooks/use-toast';

type ButtonDeleteProps = {
    todoID: string
}

export default function ButtonDelete(props: ButtonDeleteProps) {
    const { refetch: todoRefetch } = api.todo.getAll.useQuery()
    const { mutate: deleteTodo, isPending: todoPending } = api.todo.delete.useMutation({
        onSettled: async () => {
            await todoRefetch()
            toast({
                title: 'Success',
                description: 'Success Deleted Todo',
            })
        }
    })
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'destructive'}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your todo
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" size="sm" className="ml-2" onClick={() => { deleteTodo(props.todoID) }} disabled={todoPending}>
                        {todoPending ? 'Deleting...' : 'Confirm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}