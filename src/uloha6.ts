function faktorial(vstup:number):void {
    let cisla: string = "";

    for (let i = 0; i < vstup; i++) {
        cisla += vstup - i;
        if (i != vstup - 1) {
            cisla += ".";
        }
    }

    if (vstup <= 0 && !Number.isInteger(vstup)) {
        console.log("Zadaj celé číslo > 0");
    } else {
        console.log(`${vstup}! = ${cisla}`);
    }
}
faktorial(5);