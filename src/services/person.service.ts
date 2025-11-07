import {Request, Response} from 'express';
import {Storage} from '../storage/Storage';
import {Person} from '../classes/Person';
import {getValidId, getPerson} from '../utils/validation.utils';

const storage = Storage.getInstance();

export const getAllPersons = (req: Request, res: Response) => {
    res.send(storage.getAllPersons());
};

export const getPersonById = (req: Request, res: Response) => {
    const id = getValidId(req, res);
    if (!id) return;
    const p = getPerson(id, res);
    if (!p) return;
    res.send(p);
};

export const createPerson = (req: Request, res: Response) => {
    const p = new Person(storage.getNextId(), req.body.name, req.body.email);
    storage.addPerson(p);
    res.status(201).send(p.getId());
};

export const updatePersonById = (req: Request, res: Response) => {
    const id = getValidId(req, res);
    if (!id) return;
    const p = getPerson(id, res);
    if (!p) return;

    if (req.body.name) p.setName(req.body.name);
    if (req.body.email) p.setEmail(req.body.email);

    res.sendStatus(200);
};

export const deletePersonById = (req: Request, res: Response) => {
    const id = getValidId(req, res);
    if (!id) return;
    const p = getPerson(id, res);
    if (!p) return;
    storage.deletePersonById(id);
    res.sendStatus(204);
};
