import {Request, Response} from 'express';
import {Storage} from '../storage/Storage';
import {Reservation} from '../classes/Reservation';
import {getObject} from '../utils/validation.utils';

const storage = Storage.getInstance();

export const getAllReservations = (req: Request, res: Response) => {
    res.send(storage.getAllReservations());
}

export const getReservationByCode = (req: Request, res: Response) => {
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === req.params.code, res)
    if (!rsv) {
        return;
    }

    res.send(rsv);
}

export const createReservation = (req: Request, res: Response) => {
    const { code, roomId, guestId, nights, party } = req.body;

    const existingReservation = storage.getReservationByCode(code);
    if (existingReservation) {
        return res.status(400).send(`Reservation with code '${code}' already exists.`);
    }

    // vyhladanie room
    const room = storage.getRoomById(Number(roomId));
    if (!room) {
        return res.status(404).send("Room not found");
    }
    if (room.getIsOccupied()) {
        return res.status(400).send("Room is already occupied");
    }

    // vyhladanie guest (person)
    const person = storage.getPersonById(Number(guestId));
    if (!person) {
        return res.status(404).send("Guest (Person) not found");
    }

    // vytvorenie rezervacie
    const newReservation = new Reservation(
        code,
        person,
        room,
        nights,
        party
    );

    // nastavenie izby ako obsadenej
    room.setOccupied(true);

    // ulozenie
    storage.addReservation(newReservation);

    res.status(201).json({ message: "Reservation created" });
};

export const updateReservationByCode = (req: Request, res: Response) => {
    const code = req.params.code!;
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === code, res)
    if (!rsv) {
        return;
    }

    if (req.body.nights) rsv.nights = req.body.nights;
    if (req.body.party) rsv.party = req.body.party;

    // update room
    if (req.body.roomId && Number(req.body.roomId) !== rsv.room.getId()) {
        const newRoomId = Number(req.body.roomId);
        const newRoom = storage.getRoomById(newRoomId);

        if (!newRoom) {
            return res.status(404).json({ error: "New room not found" });
        }

        // izba obsadena
        if (newRoom.getIsOccupied() && newRoom.getId() !== rsv.room.getId()) {
            return res.status(400).json({ error: "New room is already occupied" });
        }

        // uvolnenie starej izby
        rsv.room.setOccupied(false);

        // obsadenie starej izby
        newRoom.setOccupied(true);

        // priradenie novej izby
        rsv.room = newRoom;
    }

    if (req.body.guestId && Number(req.body.guestId) !== rsv.guest.getId()) {
        const newPerson = storage.getPersonById(Number(req.body.guestId));
        if (!newPerson) {
            return res.status(404).json({ error: "New guest not found" });
        }
        rsv.guest = newPerson;
    }

    res.status(200).json({ message: "Reservation updated" });
}


export const deleteReservationByCode = (req: Request, res: Response) => {
    const code = req.params.code!;
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === code, res)
    if (!rsv) {
        return;
    }

    // uvolnenie izby
    const room = rsv.room;
    if (room && room.getIsOccupied()) {
        room.setOccupied(false);
    }

    // vymazanie rezervacie
    storage.deleteReservationByCode(code);

    res.status(204).send(void 0); // 204 No Content pre úspešné mazanie
}
