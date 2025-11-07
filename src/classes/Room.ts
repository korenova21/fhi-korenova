export class Room {
    constructor(
        public number: string,
        public type: 'single' | 'double' | 'suite',
        public pricePerNight: number,
        public isOccupied: boolean = false
    ) {}
}
