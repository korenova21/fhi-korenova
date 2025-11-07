export class Person {
    constructor(
        private id: number,
        public name: string,
        public email: string
    ) {}

    getId(): number {
        return this.id;
    }

    setName(name:string):void{
        this.name = name;
    }

    setEmail(email:string):void{
        this.email = email;
    }

}

