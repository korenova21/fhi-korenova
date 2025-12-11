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


export const createReservation = (req: Request, res: Response) => {
    // 1. Rozbalíme dáta z JSONu, ktorý poslal Postman
    const { code, guest, room, nights, party } = req.body;

    // Poznámka: 'guest' je string ("janko hrasko") a 'room' je číslo (1)

    // 2. Nájdeme skutočný objekt Room podľa ID
    const roomObj = storage.getRoomById(Number(room));

    if (!roomObj) {
        res.status(404).send("Room not found");
        return;
    }

    // (Voliteľné) Skontrolujeme, či izba nie je obsadená
    if (roomObj.getIsOccupied()) {
        res.status(400).send("Room is already occupied!");
        return;
    }

    // 3. Vytvoríme objekt Person z mena (guest string)
    // Keďže nemáme email v requeste, dáme prázdny string alebo placeholder
    const newPerson = new Person(
        storage.getNextId(), // Vygenerujeme ID cez tvoj Storage
        guest,               // Meno: "janko hrasko"
        "guest@hotel.com"    // Placeholder email
    );

    // Uložíme osobu do storage, aby existovala aj v zozname ľudí
    storage.addPerson(newPerson);

    // 4. AKTUALIZÁCIA IZBY: Nastavíme ju ako obsadenú
    roomObj.setOccupied(true);

    // 5. Vytvoríme finálnu Rezerváciu
    // Teraz už vkladáme skutočné objekty (newPerson, roomObj), nie len IDčka
    const newReservation = new Reservation(
        code,
        newPerson,
        roomObj,
        nights,
        party
    );

    // 6. Uložíme rezerváciu
    storage.addReservation(newReservation);

    // Pošleme naspäť potvrdenie
    res.status(201).send(newReservation);
};



export const updateReservationByCode = (req: Request, res: Response) => {
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === req.params.code, res)
    if (!rsv) {
        return;
    }

    res.send(void 0);
}

export const deleteReservationByCode = (req: Request, res: Response) => {
    const code = req.params.code!;
    const rsv = getObject(storage.getAllReservations(), (p) => p.getCode() === code, res)
    if (!rsv) {
        return;
    }

    storage.deleteReservationByCode(code);

    res.send(void 0);
}
