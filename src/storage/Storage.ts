import { Person } from "../classes/Person";
import { Room } from "../classes/Room";
import { Reservation } from "../classes/Reservation";

export class Storage {
    private static instance: Storage;

    private persons: Person[] = [];
    private rooms: Room[] = [];
    private reservations: Reservation[] = [];
    private personIdCounter: number = 1;
    private roomIdCounter: number = 1;

    private constructor() {}

    static getInstance(): Storage {
        if (!this.instance) {
            this.instance = new Storage();
        }
        return this.instance;
    }

    //ID pre person a room
    getNextPersonId(): number {
        return this.personIdCounter++;
    }
    getNextRoomId(): number {
        return this.roomIdCounter++;
    }
    // ---------------------------------------------------------
    // PERSONS
    // ---------------------------------------------------------
    getAllPersons(): Person[] {
        return this.persons;
    }

    getPersonById(id: number): Person | undefined {
        return this.persons.find((p) => p.getId() === id);
    }

    getPersonByEmail(email: string): Person | undefined {
        return this.persons.find(
            (p) => p.getEmail().toLowerCase() === email.toLowerCase()
        );
    }

    addPerson(p: Person): void {
        this.persons.push(p);
    }

    deletePersonById(id: number): void {
        this.persons = this.persons.filter((p) => p.getId() !== id);
    }

    // ---------------------------------------------------------
    // ROOMS
    // ---------------------------------------------------------
    getAllRooms(): Room[] {
        return this.rooms;
    }

    getRoomById(id: number): Room | undefined {
        return this.rooms.find((room) => room.getId() === id);
    }

    addRoom(room: Room): void {
        this.rooms.push(room);

    }

    deleteRoomById(id: number): void {
        this.rooms = this.rooms.filter((room) => room.getId() !== id);
    }

    // ---------------------------------------------------------
    // RESERVATIONS
    // ---------------------------------------------------------
    getAllReservations(): Reservation[] {
        return this.reservations;
    }

    getReservationByCode(code: string): Reservation | undefined {
        return this.reservations.find((r) => r.getCode() === code);
    }

    addReservation(r: Reservation): void {
        this.reservations.push(r);
    }

    deleteReservationByCode(code: string): void {
        this.reservations = this.reservations.filter((r) => r.getCode() !== code);
    }
}

