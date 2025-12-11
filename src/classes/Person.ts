export class Person {
    constructor(
        private id: number,
        private name: string,
        private email: string
    ) {}

    // ID
    getId(): number {
        return this.id;
    }

    // NAME
    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    // EMAIL
    getEmail(): string {
        return this.email;
    }

    setEmail(email: string): void {
        this.email = email;
    }
}

