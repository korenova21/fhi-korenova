import { Request, Response } from "express";
import { Storage } from "../storage/Storage";
import { Room } from "../classes/Room";
import { compareId, gatValidId, getObject } from "../utils/validation.utils";

const storage = Storage.getInstance();

export const getAllRooms = (req: Request, res: Response) => {
    res.send(storage.getAllRooms());
};


export const getRoomById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const room = getObject(
        storage.getAllRooms(),
        (r) => compareId(r, id),
        res
    );
    if (!room) return;

    res.send(room);
};

export const createRoom = (req: Request, res: Response) => {

    const isOccupied = req.body.isOccupied === "occupied";

    const room = new Room(
        storage.getNextRoomId(),
        req.body.cislo,
        req.body.type,
        req.body.price,
        isOccupied,
        req.body.capacity
    );

    storage.addRoom(room);
    res.status(201).send(room.getId());
};

export const updateRoomById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const room = getObject(
        storage.getAllRooms(),
        (room) => compareId(room, id),
        res
    );
    if (!room) return;

    // UPDATE: type
    if (req.body.type) {
        room.setType(req.body.type);
    }

    // UPDATE: price
    if (req.body.price) {
        room.setPrice(req.body.price);
    }

    // UPDATE: capacity
    if (req.body.capacity) {
        room.setCapacity(req.body.capacity);
    }

    // UPDATE: isOccupied
    if (req.body.isOccupied !== undefined) {
        const newValue =
            req.body.isOccupied === "occupied";

        room.setOccupied(newValue);
    }

    res.send(void 0);
};

export const deleteRoomById = (req: Request, res: Response) => {
    const id = gatValidId(req, res);
    if (!id) return;

    const room = getObject(
        storage.getAllRooms(),
        (room) => compareId(room, id),
        res
    );
    if (!room) return;

    const hasActiveReservation = storage.getAllReservations().some(r => r.room.getId() === id);

    if (hasActiveReservation) {
        res.status(400).send("Cannot delete room: Room has active reservations.");
        return;
    }

    storage.deleteRoomById(id);
    res.status(204).send(void 0);
};