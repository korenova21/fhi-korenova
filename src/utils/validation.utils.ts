import {Request, Response} from 'express';
import {Storage} from '../storage/Storage';

const storage = Storage.getInstance();

export function getValidId(req: Request, res: Response): number | null {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('Invalid ID');
        return null;
    }
    return id;
}

export function getPerson(id: number, res: Response) {
    const p = storage.getPersonById(id);
    if (!p) {
        res.status(404).send('Person not found');
        return null;
    }
    return p;
}
