import { Person } from './Person';

export class Employee extends Person {
    constructor(
        id: number,
        name: string,
        email: string,
        public role: 'receptionist' | 'manager' | 'cleaner'
    ) {
        super(id, name, email);
    }
}
