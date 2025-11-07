abstract class Vozidlo{
    private nazov:string
    private farba: string;
    constructor(nazov:string, farba:string){
        this.nazov = nazov;
        this.farba = farba;
    };
    pohyb(): void {
        console.log(`Vozidlo sa hybe!`);
    }
}


class Auto extends Vozidlo{
    private kolesa: string;
    constructor(nazov:string, farba:string, kolesa:string){
        super(nazov, farba);
        this.kolesa = kolesa;
    }


}

const auticko = new Auto("Fiat", "cierna", "4");

class Lod extends Vozidlo{
    private vrtule: string;
    constructor(nazov:string, farba: string, vrtule:string){
        super(nazov, farba);
        this.vrtule = vrtule;
    }
}

const lodicka = new Lod("Titanic", "biela", "5");

const garaz:Vozidlo[] = [];

garaz.push(auticko);
garaz.push(lodicka);

console.log(auticko);
lodicka.pohyb();
console.log(garaz);