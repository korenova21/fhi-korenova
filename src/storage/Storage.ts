import {Person} from '../classes/Person';
import {Room} from '../classes/Room';
import {Reservation} from '../classes/Reservation';


export class Storage {
    private static instance: Storage;

    private persons: Person[] = [];
    private rooms: Room[] = [];
    private reservations: Reservation[] = [];
    private id: number = 1;

    private constructor() {}

    static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    getNextId(): number {
        return this.id++;
    }

    // PERSONS
    getAllPersons() { return this.persons; }
    getPersonById(id: number) {
        return this.persons.find(p => p.getId() === id);
    }
    addPerson(p: Person) { this.persons.push(p); }
    deletePersonById(id: number) {
        this.persons = this.persons.filter(p => p.getId() !== id);
    }

    // ROOMS
    getAllRooms() { return this.rooms; }
    addRoom(room: Room) { this.rooms.push(room); }

    // RESERVATIONS
    getReservations() { return this.reservations; }
    addReservation(res: Reservation) { this.reservations.push(res); }
}
