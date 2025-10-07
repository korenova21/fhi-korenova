function zasifruj(retazec:string):void {
    retazec = retazec.toUpperCase();
    retazec = retazec.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const balti_p: string[] = ["B", "A", "L", "T", "I", "M", "O", "R", "E", "S", "K", "Y"];
    const balti_c: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let vysledok = "";

    for (let i = 0; i < retazec.length; i++) {
        for (let j = 0; j < balti_p.length; j++) {
            if (balti_p[j] == retazec[i]) {
                vysledok += balti_c[j];
                break;

            } else if (j == balti_p.length - 1) {
                vysledok += retazec[i];

            }

        }
    }
    console.log(vysledok);
}
zasifruj("To nemyslíte vážne!");