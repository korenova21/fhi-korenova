let cena: number = 0;

function platba(pocet_km: number, cakanie: number, znecistenie: boolean): void {
    cena = 1.5; // základná cena

    let polozky: string[] = ["1,50"]; // sem budeme pridávať len aktívne položky

    if (pocet_km > 5) {
        let priplatokKm = (pocet_km - 5) * 0.75;
        cena += priplatokKm;
        polozky.push(`${pocet_km - 5}×0,75`);
    }

    if (cakanie > 0) {
        let priplatokCakanie = cakanie * 10 / 60;
        cena += priplatokCakanie;
        polozky.push(`${cakanie}×10/60`);
    }

    if (znecistenie) {
        cena += 20;
        polozky.push("+20");
    }

    console.log(`${Math.ceil(cena * 100) / 100}€ (${polozky.join(" + ")})`);
}

// príklad
platba(15, 5, false);
platba(3, 0, true);
