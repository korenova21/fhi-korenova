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

import {
    getAllPersons,
    getPersonById,
    createPerson,
    updatePersonById,
    deletePersonById
} from './services/person.service';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running! 🚀');
});

// Room routes
app.get('/rooms', getAllRooms);
app.get('/rooms/:id', getRoomById);
app.post('/rooms/', createRoom);
app.put('/rooms/:id', updateRoomById);
app.delete('/rooms/:id', deleteRoomById);

// Person Routes
app.get('/persons', getAllPersons);
app.get('/persons/:id', getPersonById);
app.post('/persons/', createPerson);
app.put('/persons/:id', updatePersonById);
app.delete('/persons/:id', deletePersonById);

// Reservation routes
app.get('/reservations', getAllReservations);
app.get('/reservations/:code', getReservationByCode);
app.post('/reservations/', createReservation);
app.put('/reservations/:code', updateReservationByCode);
app.delete('/reservations/:code', deleteReservationByCode);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
