import {Request, Response} from 'express';
import {Storage} from '../storage/Storage';
import {Reservation} from '../classes/Reservation';
import {getObject} from '../utils/validation.utils';
import { Person } from '../classes/Person';

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
/*
export const createReservation = (req: Request, res: Response) => {
    const reservation = req.body;

    const room = storage.getRoomById(reservation.roomId);

    if (!room) {
        return res.status(404).send("Room not found");
    }

    // 1. nastavíme room ako obsadenú
    room.setOccupied(true);

    // 2. uložíme rezerváciu
    storage.addReservation(reservation);

    res.status(201).send("Reservation created");
};

*/

// Pridaj import Person, ak ho tam nemáš


// Pridaj importy na začiatok, ak chýbajú
// import { storage } from ... (tvoj storage)
// import { Reservation } from ...

export const createReservation = (req: Request, res: Response) => {
    const { code, roomId, guestId, nights, party } = req.body;

    // 1. Nájdeme Room
    const room = storage.getRoomById(Number(roomId));
    if (!room) {
        return res.status(404).send("Room not found");
    }
    if (room.getIsOccupied()) {
        return res.status(400).send("Room is already occupied");
    }

    // 2. Nájdeme Guest (Person)
    const person = storage.getPersonById(Number(guestId));
    if (!person) {
        return res.status(404).send("Guest (Person) not found");
    }

    // 3. Vytvoríme rezerváciu
    // room a person sú teraz skutočné objekty
    const newReservation = new Reservation(
        code,
        person,
        room,
        Number(nights),
        party
    );

    // 4. Nastavíme izbu ako obsadenú
    room.setOccupied(true);

    // 5. Uložíme
    storage.addReservation(newReservation);

    res.status(201).send("Reservation created");
};



// ... existujúce importy

// ...
export const updateReservationByCode = (req: Request, res: Response) => {
    const code = req.params.code!;
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === code, res)
    if (!rsv) {
        return;
    }

    // Základná logika pre update (bez zmeny izby alebo hosťa)
    if (req.body.nights) {
        rsv.nights = req.body.nights;
    }
    if (req.body.party) {
        rsv.party = req.body.party;
    }

    res.status(200).send(void 0); // 200 OK
}


export const deleteReservationByCode = (req: Request, res: Response) => {
    const code = req.params.code!;
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === code, res)
    if (!rsv) {
        return;
    }

    // 1. Uvoľníme izbu, ak je obsadená (kľúčová funkcionalita)
    const room = rsv.room;
    if (room && room.getIsOccupied()) {
        room.setOccupied(false);
    }

    // 2. Vymažeme rezerváciu
    storage.deleteReservationByCode(code);

    res.status(204).send(void 0); // 204 No Content pre úspešné mazanie
}
