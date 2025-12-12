export class Room {
    constructor(
        private id: number,
        private cislo: string,
        private type: 'single' | 'double' | 'suite' | 'deluxe',
        private price: string,
        private isOccupied: boolean,
        private capacity: number
    ) {}

    // GETTERS
    getId(): number {
        return this.id;
    }

    getNumber(): string {
        return this.cislo;
    }

    getType() {
        return this.type;
    }

    getPrice() {
        return this.price;
    }

    getIsOccupied() {
        return this.isOccupied;
    }

    getCapacity() {
        return this.capacity;
    }

    // SETTERS
    setNumber(cislo: string) {
        this.cislo = cislo;
    }

    setType(type: 'single' | 'double' | 'suite' | 'deluxe') {
        this.type = type;
    }

    setPrice(price: string) {
        this.price = price;
    }

    setOccupied(status: boolean) {
        this.isOccupied = status;
    }

    setCapacity(capacity: number) {
        this.capacity = capacity;
    }
}
