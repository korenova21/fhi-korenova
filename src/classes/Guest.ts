import { Person } from './Person';

export class Guest extends Person {
    constructor(
        id: number,
        name: string,
        email: string,
        public preferredRoomType?: string
    ) {
        super(id, name, email);
    }
}
