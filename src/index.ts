import express from 'express';
import cors from 'cors';
import {Request, Response} from 'express';
import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoomById,
    deleteRoomById
} from './services/room.service';

import {
    createReservation, deleteReservationByCode,
    getAllReservations, getReservationByCode, updateReservationByCode

} from './services/reservation.service';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running! 🚀');
});

// Person routes
app.get('/rooms', getAllRooms);
app.get('/rooms/:id', getRoomById);
app.post('/rooms/', createRoom);
app.put('/rooms/:id', updateRoomById);
app.delete('/rooms/:id', deleteRoomById);

// Reservation routes
app.get('/reservations', getAllReservations);
app.get('/reservations/:id', getReservationByCode);
app.post('/reservations/', createReservation);
app.put('/reservations/:id', updateReservationByCode);
app.delete('/reservations/:id', deleteReservationByCode);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})








/*
import { Guest } from './classes/Guest';
import { Employee } from './classes/Employee';
import { Room } from './classes/Room';
import { Hotel } from './classes/Hotel';
import { ReceptionPanel } from './classes/ReceptionPanel';

const guest1 = new Guest('Alice Johnson', 'alice@email.com', 'suite');
const guest2 = new Guest('Bob Smith', 'bob@email.com', 'double');

const employee1 = new Employee('Sarah Miller', 'sarah@hotel.com', 'receptionist');
const employee2 = new Employee('John Doe', 'john@hotel.com', 'manager');

const room101 = new Room('101', 'single', 60);
const room102 = new Room('102', 'double', 90);
const room201 = new Room('201', 'suite', 150);

const hotel = new Hotel('Sunrise Hotel');
hotel.addRoom(room101);
hotel.addRoom(room102);
hotel.addRoom(room201);
hotel.addEmployee(employee1);
hotel.addEmployee(employee2);

const reception = new ReceptionPanel(hotel);

reception.makeReservation(guest1, '201', '2025-10-22', '2025-10-25');
reception.makeReservation(guest2, '102', '2025-10-24', '2025-10-28');

console.log('\n--- Active Reservations ---');
console.log(hotel.getActiveReservations());

console.log('\n--- Available Rooms ---');
console.log(reception.listAvailableRooms());

console.log('\n--- Cancel Reservation for Alice ---');
reception.cancelReservation('Alice Johnson');

console.log('\n--- Available Rooms after cancellation ---');
console.log(reception.listAvailableRooms());

 */
