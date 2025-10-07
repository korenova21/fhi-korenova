function platba(pocet_km: number, cakanie: number, znecistenie: boolean): void {
    let cena: number = 1.5;
    let polozky: string[] = ["1,50"];

    if (pocet_km > 5) {
        let priplatokKm = (pocet_km - 5) * 0.75;
        cena += priplatokKm;
        polozky.push(`${pocet_km - 5}*0,75`);
    }
    if (cakanie > 0) {
        let priplatokCakanie = cakanie * 10 / 60;
        cena += priplatokCakanie;
        polozky.push(`${cakanie}*10/60`);
    }
    if (znecistenie) {
        cena += 20;
        polozky.push("+20");
    }
    console.log(`${Math.ceil(cena * 100) / 100}€ (${polozky.join(" + ")})`);
}

platba(15, 5, false);
