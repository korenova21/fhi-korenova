import { Room } from './Room';
import { Reservation } from './Reservation';
import { Employee } from './Employee';

export class Hotel {
    constructor(
        public name: string,
        public rooms: Room[] = [],
        public reservations: Reservation[] = [],
        public employees: Employee[] = []
    ) {}

    addRoom(room: Room) {
        this.rooms.push(room);
    }

    addEmployee(employee: Employee) {
        this.employees.push(employee);
    }

    addReservation(res: Reservation) {
        this.reservations.push(res);
        res.room.isOccupied = true;
    }

    cancelReservation(guestName: string) {
        const res = this.reservations.find(r => r.guest.name === guestName);
        if (!res) return false;
        res.room.isOccupied = false;
        this.reservations = this.reservations.filter(r => r !== res);
        return true;
    }

    getAvailableRooms() {
        return this.rooms.filter(r => !r.isOccupied);
    }

    getActiveReservations() {
        return this.reservations;
    }
}
