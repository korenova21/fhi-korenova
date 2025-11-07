/*
import {Request, Response} from 'express';
import {Storage} from '../storage/Storage';
import {Room} from '../classes/Room';

import {getValidId, getPerson} from '../utils/validation.utils';

const storage = Storage.getInstance();

export const getAllRooms = (req: Request, res: Response) => {
    res.send(storage.getAllRooms());
};

export const getPersonById = (req: Request, res: Response) => {
    const id = getValidId(req, res);
    if (!id) return;
    const p = getPerson(id, res);
    if (!p) return;
    res.send(p);
};

export const createRoom = (req: Request, res: Response) => {
    const p = new Room(storage.getNextId(), req.body.name, req.body.email);
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