import React from 'react';
import ButtonDelete from './ButtonDelete';
import ButtonUpdate from './ButtonUpdate';
import { useDebouncedCallback } from 'use-debounce';
import { api } from '~/utils/api';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { TableCell, TableRow } from "~/components/ui/table"
import type { Todo } from '~/types/todo';

type TodoCardProps = {
    todo: Todo;
};

export default function TodoCard(props: TodoCardProps) {
    const { refetch: todoRefetch } = api.todo.getAll.useQuery();

    const { mutate: toggleTodoStatus, isPending: todoPending } = api.todo.toggle.useMutation({
        onSettled: async () => {
            await todoRefetch();
        },
    });

    const debouncedToggleStatus = useDebouncedCallback(
        (id: string, status: boolean) => {
            toggleTodoStatus({ id, status });
        },
        300
    );

    return (
        <TableRow>
            <TableCell className='capitalize'>{props.todo.text}</TableCell>
            <TableCell>
                {todoPending ? <span>loading...</span> : <span>{props.todo.status ? 'Done' : 'On Going'}</span>}
            </TableCell>
            <TableCell className="text-right flex items-center gap-5 justify-end">
                <Label htmlFor="status" className="flex items-center space-x-2">
                    <Checkbox
                        id="status"
                        name="status"
                        checked={props.todo.status}
                        onCheckedChange={(checked) => debouncedToggleStatus(props.todo.id!, checked as boolean)}
                    />
                </Label>
                <ButtonUpdate />
                <ButtonDelete todoID={props.todo.id!} />
            </TableCell>
        </TableRow>
    )
}