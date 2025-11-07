import { Hotel } from './Hotel';
import { Reservation } from './Reservation';
import { Guest } from './Guest';
import { Room } from './Room';

export class ReceptionPanel {
    constructor(public hotel: Hotel) {}

    makeReservation(guest: Guest, roomNumber: string, from: string, to: string): Reservation | null {
        const room = this.hotel.rooms.find(r => r.number === roomNumber && !r.isOccupied);
        if (!room) {
            console.log('Room not available.');
            return null;
        }
        const reservation = new Reservation(guest, room, from, to);
        this.hotel.addReservation(reservation);
        console.log(`Reservation created for ${guest.name} in room ${room.number}`);
        return reservation;
    }

    cancelReservation(guestName: string) {
        const success = this.hotel.cancelReservation(guestName);
        if (success) console.log(`Reservation for ${guestName} cancelled.`);
        else console.log(`Reservation for ${guestName} not found.`);
    }

    listAvailableRooms() {
        return this.hotel.getAvailableRooms();
    }
}
