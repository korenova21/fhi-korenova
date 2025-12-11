import {Request, Response} from 'express';

export function compareId<T extends {getId: () => number}>(item: T, id: number): boolean {
    return item.getId() === id;
}

export function gatValidId(req: Request, res: Response): number | null {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return null;
    }

    return id;
}

export function getObject<T>(items: T[], compareFn: (item: T) => boolean, res: Response): T | null {
    const item = items.find(item => compareFn(item));

    if (!item) {
        res.status(404).send('Object not found');
        return null;
    }

    return item;
}