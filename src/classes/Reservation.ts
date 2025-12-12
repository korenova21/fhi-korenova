import { Person } from './Person'; // Zmena z Guest na Person
import { Room } from './Room';

export class Reservation {
    constructor(
        public code: string,
        public guest: Person, // Tu používame Person
        public room: Room,
        public nights: number,
        public party: number
    ) {}

    getCode(): string {
        return this.code;
    }
}