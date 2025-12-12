import { Person } from './Person';
import { Room } from './Room';

export class Reservation {
    constructor(
        public code: string,
        public guest: Person,
        public room: Room,
        public nights: number,
        public party: number
    ) {}

    getCode(): string {
        return this.code;
    }
}