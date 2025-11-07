import { Guest } from './Guest';
import { Room } from './Room';

export class Reservation {
    constructor(
        public guest: Guest,
        public room: Room,
        public fromDate: string,
        public toDate: string
    ) {}

    getNights(): number {
        const from = new Date(this.fromDate);
        const to = new Date(this.toDate);
        return Math.ceil((to.getTime() - from.getTime()) / (1000 * 3600 * 24));
    }

    getTotalPrice(): number {
        return this.getNights() * this.room.pricePerNight;
    }
}
